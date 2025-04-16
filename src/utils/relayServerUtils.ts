
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
      throw new Error('No stream keys configured');
    }
    
    // Connect to the relay server via WebSocket
    websocket = new WebSocket(`ws://${new URL(RELAY_SERVER_URL).host}`);
    
    return new Promise((resolve, reject) => {
      if (!websocket) {
        reject(new Error('WebSocket connection failed to initialize'));
        return;
      }
      
      websocket.onopen = () => {
        console.log('Connected to relay server');
        
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
          reject(error);
        }
      };
      
      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(new Error('WebSocket connection error'));
      };
      
      websocket.onclose = () => {
        console.log('WebSocket connection closed');
        // Stop the media recorder if it's still running
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
        mediaRecorder = null;
      };
    });
  } catch (error) {
    console.error('Error connecting to relay server:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
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
      websocket.close();
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
    // Use a simple health check endpoint to determine if the relay server is running
    const response = await fetch(`${RELAY_SERVER_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Error checking relay server availability:', error);
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
