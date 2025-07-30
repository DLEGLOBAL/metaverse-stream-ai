const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');

function startRelayServer(port = 3000) {
  console.log(`Starting relay server on port ${port}`);
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  // Create HTTP server
  const server = http.createServer(app);
  
  // Create WebSocket server
  const wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        console.log('Received message:', data.type);
        
        if (data.type === 'init') {
          console.log('Initializing stream for platforms:', data.platforms?.length || 0);
          ws.send(JSON.stringify({ 
            type: 'initialized', 
            success: true,
            message: 'Stream initialized successfully' 
          }));
        } else if (data.type === 'getStats') {
          ws.send(JSON.stringify({
            type: 'stats',
            data: {
              bytesTransmitted: Math.floor(Math.random() * 1000000),
              uptime: Math.floor(Date.now() / 1000) % 3600,
              fps: 30,
              bitrate: 2500,
              viewers: Math.floor(Math.random() * 100)
            }
          }));
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
  
  // Start server
  server.listen(port, () => {
    console.log(`Relay server running on http://localhost:${port}`);
  });
  
  return server;
}

module.exports = { startRelayServer };
