
import { Stats, StreamStatus } from '../types';
import { getAllActiveStreams } from './mediaStreamUtils';
import { getActiveDestinations } from './streamingControls';

// Variables for stats tracking
let streamingStatsInterval: number | null = null;

// Function to simulate stream stats
export const simulateStatsChange = (
  streamStatus: StreamStatus,
  setStats: (stats: Stats) => void
) => {
  // Only simulate changes when streaming is active
  if (streamStatus !== 'live') return;
  
  // Clear any existing interval
  if (streamingStatsInterval) {
    clearInterval(streamingStatsInterval);
  }
  
  // Generate realistic stats based on actual video resolution and encoding
  const getActiveResolution = () => {
    const streams = getAllActiveStreams();
    let resolution = "720p";
    
    // Try to get actual resolution from video track
    if (streams.camera || streams.display) {
      const stream = streams.camera || streams.display;
      const videoTrack = stream.getVideoTracks()[0];
      
      if (videoTrack) {
        const settings = videoTrack.getSettings();
        if (settings.width && settings.height) {
          if (settings.width >= 1920) {
            resolution = "1080p";
          } else if (settings.width >= 1280) {
            resolution = "720p";
          } else {
            resolution = "480p";
          }
        }
      }
    }
    
    return resolution;
  };
  
  const resolution = getActiveResolution();
  const baseBitrate = resolution === "1080p" ? 6000 : resolution === "720p" ? 4500 : 2500;
  
  let streamStartTime = Date.now();
  let viewers = Math.floor(Math.random() * 10) + 1; // Start with 1-10 viewers
  
  // Update stats on interval
  streamingStatsInterval = window.setInterval(() => {
    // Calculate stream duration in seconds
    const streamDuration = Math.floor((Date.now() - streamStartTime) / 1000);
    
    // Gradually increase viewers (more realistic)
    if (streamDuration > 60 && streamDuration % 30 === 0) {
      // Every 30 seconds after the first minute, maybe add some viewers
      if (Math.random() > 0.7) {
        viewers += Math.floor(Math.random() * 3) + 1;
      }
    }
    
    // Calculate bitrate with some fluctuation
    const bitrateFluctuation = Math.floor(Math.random() * 500) - 250; // +/- 250
    const currentBitrate = baseBitrate + bitrateFluctuation;
    
    // CPU usage increases slightly over time
    const baseCpuUsage = 20 + Math.floor(streamDuration / 60); // Increase by ~1% per minute
    const cpuVariation = Math.floor(Math.random() * 10) - 5; // +/- 5%
    const cpuUsage = Math.min(95, Math.max(5, baseCpuUsage + cpuVariation)); // Keep between 5-95%
    
    // RAM usage is more stable but gradually increases
    const baseRamUsage = 2.5 + (streamDuration / 3600); // Add ~1GB per hour
    const ramVariation = (Math.random() * 0.3) - 0.15; // +/- 0.15GB
    const ramUsage = baseRamUsage + ramVariation;
    
    // Stream health
    const streamQuality = 
      currentBitrate < baseBitrate - 1000 ? 'warning' :
      cpuUsage > 90 ? 'warning' :
      'good';
    
    setStats({
      bitrate: `${currentBitrate} kbps`,
      cpuUsage: `${cpuUsage}%`,
      ramUsage: `${ramUsage.toFixed(1)} GB`,
      gpuEncoding: 'NVENC',
      status: streamQuality,
      resolution: resolution,
      frameRate: resolution === "1080p" ? "30fps" : "60fps",
      viewers: viewers.toString(),
      activeDestinations: getActiveDestinations()
    });
  }, 3000);
  
  // Return cleanup function
  return () => {
    if (streamingStatsInterval) {
      clearInterval(streamingStatsInterval);
      streamingStatsInterval = null;
    }
  };
};

// Clean up resources when no longer needed
export const cleanupStreamingStats = () => {
  if (streamingStatsInterval) {
    clearInterval(streamingStatsInterval);
    streamingStatsInterval = null;
  }
};
