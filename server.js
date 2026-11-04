const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = parseInt(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, 'public', url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(filePath);
    const types = {'.html':'text/html','.js':'application/javascript','.css':'text/css'};
    res.writeHead(200, {'Content-Type': types[ext]||'text/plain'});
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => console.log('listening on', PORT));
