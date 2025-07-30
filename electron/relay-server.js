const http = require('http');
const url = require('url');

function startRelayServer(port = 3000) {
  console.log(`Starting relay server on port ${port}`);
  
  // Create HTTP server using only built-in Node.js modules
  const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    const parsedUrl = url.parse(req.url, true);
    
    // Health check endpoint
    if (parsedUrl.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        message: 'Relay server is running'
      }));
      return;
    }
    
    // Default response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      message: 'MetaStream Relay Server',
      version: '1.0.0',
      endpoints: ['/health']
    }));
  });
  
  // Start server
  server.listen(port, '127.0.0.1', () => {
    console.log(`Relay server running on http://127.0.0.1:${port}`);
  });
  
  server.on('error', (error) => {
    console.error('Relay server error:', error);
  });
  
  return server;
}

module.exports = { startRelayServer };
