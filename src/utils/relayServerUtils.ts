
/**
 * This file contains utilities for interacting with a server-side streaming relay.
 * It implements the WebSocket-based relay architecture that uses FFmpeg on the server
 * to convert browser media streams to RTMP for Twitch and other platforms.
 */

// Configuration
const RELAY_SERVER_URL = import.meta.env.VITE_RELAY_SERVER_URL || 'http://localhost:3000';

// Interfaces
interface StreamingPlatform {
  platform: string;
  rtmpUrl: string;
  streamKey: string;
}

interface RelayResponse {
  success: boolean;
  sessionId?: string;
  message?: string;
  error?: string;
}

/**
 * WebSocket connection to the relay server
 */
let websocket: WebSocket | null = null;
let mediaRecorder: MediaRecorder | null = null;
let connectionAttempts = 0;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Custom event for relay server errors
const dispatchRelayServerError = (message: string) => {
  const event = new CustomEvent('relay-server-error', { 
    detail: { message } 
  });
  window.dispatchEvent(event);
};

/**
 * Initializes a connection to the relay server and starts streaming
 * 
 * @param mediaStream The MediaStream object to broadcast
 * @param platforms Array of streaming platforms to broadcast to
 * @returns Promise with the relay session response
 */
export const startRelayStream = async (
  mediaStream: MediaStream, 
  platforms: StreamingPlatform[]
): Promise<RelayResponse> => {
  try {
    // Reset connection attempts
    connectionAttempts = 0;
    
    // Close any existing connection
    if (websocket) {
      websocket.close();
      websocket = null;
    }
    
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder = null;
    }
    
    // Ensure we have at least one platform with a stream key
    const enabledPlatforms = platforms.filter(p => p.streamKey.trim() !== '');
    if (enabledPlatforms.length === 0) {
      const errorMessage = 'No stream keys configured';
      dispatchRelayServerError(errorMessage);
      throw new Error(errorMessage);
    }
    
    return await connectToRelayServer(mediaStream, platforms);
  } catch (error) {
    console.error('Error connecting to relay server:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error connecting to relay server';
    dispatchRelayServerError(errorMessage);
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Connect to relay server with retry logic
 */
const connectToRelayServer = async (
  mediaStream: MediaStream,
  platforms: StreamingPlatform[]
): Promise<RelayResponse> => {
  try {
    // Connect to the relay server via WebSocket
    const wsUrl = `ws://${new URL(RELAY_SERVER_URL).host}`;
    console.log(`Connecting to relay server at ${wsUrl}`);
    
    websocket = new WebSocket(wsUrl);
    
    return new Promise((resolve, reject) => {
      if (!websocket) {
        const errorMessage = 'WebSocket connection failed to initialize';
        dispatchRelayServerError(errorMessage);
        reject(new Error(errorMessage));
        return;
      }
      
      // Set timeout for connection
      const connectionTimeout = setTimeout(() => {
        if (websocket && websocket.readyState !== WebSocket.OPEN) {
          const errorMessage = 'Connection to relay server timed out';
          dispatchRelayServerError(errorMessage);
          websocket.close();
          reject(new Error(errorMessage));
        }
      }, 10000); // 10 second timeout
      
      websocket.onopen = () => {
        console.log('Connected to relay server');
        clearTimeout(connectionTimeout);
        
        // Send initialization data with platform info
        websocket.send(JSON.stringify({
          type: 'init',
          platforms: platforms.map(p => ({
            platform: p.platform,
            rtmpUrl: p.rtmpUrl,
            streamKey: p.streamKey
          }))
        }));
        
        // Start recording and sending media data
        try {
          mediaRecorder = new MediaRecorder(mediaStream, {
            mimeType: 'video/webm; codecs=vp8,opus',
            videoBitsPerSecond: 2500000, // 2.5 Mbps
            audioBitsPerSecond: 128000   // 128 kbps
          });
          
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0 && websocket && websocket.readyState === WebSocket.OPEN) {
              websocket.send(event.data);
            }
          };
          
          mediaRecorder.start(100); // Send data in 100ms chunks
          
          resolve({
            success: true,
            sessionId: Date.now().toString(),
            message: 'Successfully connected to relay server',
          });
        } catch (error) {
          console.error('MediaRecorder error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Media recorder initialization failed';
          dispatchRelayServerError(errorMessage);
          reject(error);
        }
      };
      
      websocket.onerror = (error) => {
        clearTimeout(connectionTimeout);
        console.error('WebSocket error:', error);
        const errorMessage = 'WebSocket connection error';
        dispatchRelayServerError(errorMessage);
        
        // Try to reconnect if under max attempts
        if (connectionAttempts < MAX_RETRY_ATTEMPTS) {
          connectionAttempts++;
          console.log(`Retry attempt ${connectionAttempts} of ${MAX_RETRY_ATTEMPTS}`);
          
          setTimeout(() => {
            connectToRelayServer(mediaStream, platforms)
              .then(resolve)
              .catch(reject);
          }, RETRY_DELAY * connectionAttempts);
        } else {
          dispatchRelayServerError(`Failed to connect after ${MAX_RETRY_ATTEMPTS} attempts`);
          reject(new Error(`Connection failed after ${MAX_RETRY_ATTEMPTS} attempts`));
        }
      };
      
      websocket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        console.log(`WebSocket connection closed with code ${event.code}: ${event.reason}`);
        
        // Stop the media recorder if it's still running
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
        mediaRecorder = null;
        
        // If this wasn't intentional and we haven't exceeded retry attempts, try to reconnect
        if (!event.wasClean && connectionAttempts < MAX_RETRY_ATTEMPTS) {
          connectionAttempts++;
          console.log(`Connection closed unexpectedly. Retry attempt ${connectionAttempts} of ${MAX_RETRY_ATTEMPTS}`);
          
          setTimeout(() => {
            connectToRelayServer(mediaStream, platforms)
              .then(resolve)
              .catch(reject);
          }, RETRY_DELAY * connectionAttempts);
        }
      };
    });
  } catch (error) {
    console.error('Error in connectToRelayServer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error in relay server connection';
    dispatchRelayServerError(errorMessage);
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Stops an active relay streaming session
 * 
 * @returns Promise with the stop session response
 */
export const stopRelayStream = async (): Promise<RelayResponse> => {
  try {
    // Stop the media recorder if it's running
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    mediaRecorder = null;
    
    // Close the WebSocket connection
    if (websocket) {
      websocket.close(1000, "Stream ended by user");
      websocket = null;
    }
    
    return {
      success: true,
      message: 'Successfully stopped relay stream',
    };
  } catch (error) {
    console.error('Error stopping relay stream:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Checks if the relay server is available
 * 
 * @returns Promise<boolean> indicating if the relay server is available
 */
export const checkRelayServerAvailability = async (): Promise<boolean> => {
  try {
    console.log(`Checking relay server availability at ${RELAY_SERVER_URL}/health`);
    
    // Use a simple health check endpoint to determine if the relay server is running
    const response = await fetch(`${RELAY_SERVER_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      // Add timeout with AbortController
      signal: AbortSignal.timeout(5000)
    });
    
    const isAvailable = response.ok;
    console.log(`Relay server available: ${isAvailable}`);
    
    if (!isAvailable) {
      dispatchRelayServerError('Relay server health check failed');
    }
    
    return isAvailable;
  } catch (error) {
    console.error('Error checking relay server availability:', error);
    
    // Dispatch custom error event
    dispatchRelayServerError('Could not connect to relay server');
    
    return false;
  }
};

/**
 * Get statistics from the relay streaming session
 * 
 * @returns Promise with relay session statistics
 */
export const getRelayStreamStats = async (): Promise<any> => {
  try {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) {
      throw new Error('No active WebSocket connection');
    }
    
    // In a real implementation, you would send a message to the server
    // requesting stats and wait for a response
    websocket.send(JSON.stringify({ type: 'getStats' }));
    
    // For now, we'll return some mock stats
    return {
      bytesTransmitted: 1024 * 1024 * 5, // 5 MB
      uptime: 120, // 2 minutes
      fps: 30,
      bitrate: 2500, // kbps
      viewers: 0, // This would be retrieved from Twitch API in a real implementation
    };
  } catch (error) {
    console.error('Error getting relay stream stats:', error);
    return null;
  }
};
