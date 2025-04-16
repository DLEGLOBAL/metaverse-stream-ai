
# Browser-Based Streaming Platform with Node.js Relay

This application enables direct streaming from your browser to platforms like Twitch, YouTube, and Facebook using a Node.js relay server.

## How It Works

1. Browser captures webcam/mic/video using MediaStream API
2. Stream is sent to a Node.js relay server via WebSocket
3. Server uses FFmpeg to convert the stream to RTMP format
4. Stream is distributed to configured streaming platforms

## Setting Up the Relay Server

To enable browser-to-platform streaming, you'll need to set up a relay server. Here's how:

### Prerequisites
- Node.js 16+ installed
- FFmpeg installed on your server

### Installation

1. Clone this repository
2. Install server dependencies:
   ```
   npm install node-media-server ws express
   ```

3. Create a server.js file with the following code:
   ```javascript
   const NodeMediaServer = require('node-media-server');
   const { spawn } = require('child_process');
   const express = require('express');
   const WebSocket = require('ws');
   const http = require('http');
   const cors = require('cors');

   const app = express();
   app.use(cors());

   // Health check endpoint
   app.get('/health', (req, res) => {
     res.status(200).json({ status: 'ok' });
   });

   const server = http.createServer(app);
   const wss = new WebSocket.Server({ server });

   // Store active FFmpeg processes
   const activeStreams = new Map();

   wss.on('connection', (ws) => {
     console.log('Client connected');
     let streamKey = '';
     let ffmpegProcess = null;
     let platforms = [];

     ws.on('message', (data) => {
       // Check if it's a JSON initialization message
       if (data instanceof Buffer && data.length < 1000) {
         try {
           const strData = data.toString();
           if (strData.startsWith('{') && strData.includes('type')) {
             const jsonData = JSON.parse(strData);
             
             if (jsonData.type === 'init' && jsonData.platforms) {
               // Store platforms info
               platforms = jsonData.platforms.filter(p => p.streamKey && p.streamKey.trim() !== '');
               console.log(`Initializing stream to ${platforms.length} platforms`);
               
               // Set up FFmpeg processes for each platform
               platforms.forEach(platform => {
                 const streamProcess = spawn('ffmpeg', [
                   '-i', '-', // input from stdin
                   '-c:v', 'libx264',
                   '-preset', 'veryfast',
                   '-tune', 'zerolatency',
                   '-c:a', 'aac',
                   '-ar', '44100',
                   '-b:a', '128k',
                   '-f', 'flv',
                   `${platform.rtmpUrl}/${platform.streamKey}`
                 ]);

                 streamProcess.stderr.on('data', (data) => {
                   console.log(`[FFmpeg ${platform.platform}]`, data.toString());
                 });

                 streamProcess.on('close', (code) => {
                   console.log(`FFmpeg process for ${platform.platform} exited with code ${code}`);
                 });

                 activeStreams.set(platform.platform, streamProcess);
               });
               
               return;
             }
           }
         } catch (e) {
           // Not a JSON message, treat as binary data
         }
       }
       
       // Forward binary WebM data to all FFmpeg processes
       if (activeStreams.size > 0) {
         for (const [platform, process] of activeStreams.entries()) {
           if (process && process.stdin.writable) {
             process.stdin.write(data, (err) => {
               if (err) {
                 console.error(`Error writing to ${platform} FFmpeg process:`, err);
               }
             });
           }
         }
       }
     });

     ws.on('close', () => {
       console.log('Client disconnected');
       
       // Clean up all FFmpeg processes
       for (const [platform, process] of activeStreams.entries()) {
         console.log(`Closing FFmpeg process for ${platform}`);
         if (process) {
           process.stdin.end();
           process.kill('SIGINT');
         }
       }
       
       activeStreams.clear();
     });
   });

   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => {
     console.log(`Relay server running on port ${PORT}`);
     console.log(`Health check available at http://localhost:${PORT}/health`);
   });
   ```

4. Start the server:
   ```
   node server.js
   ```

5. Configure the client application:
   - Set the environment variable `VITE_RELAY_SERVER_URL` to point to your relay server address
   - Example: `VITE_RELAY_SERVER_URL=http://your-server-ip:3000`

## Features

- Direct browser-to-platform streaming without additional software
- Support for multiple platforms simultaneously
- Real-time statistics and monitoring
- Customizable stream quality
- Low-latency streaming

## Troubleshooting

- If the relay server connection fails, check if the server is running and accessible
- Ensure your firewall allows WebSocket connections to the relay server
- For HTTPS sites, the relay server must also use HTTPS
