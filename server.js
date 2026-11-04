const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  const f = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  fs.readFile(f, (err, d) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, {'Content-Type': req.url.endsWith('.js') ? 'application/javascript' : 'text/html'});
    res.end(d);
  });
}).listen(PORT, '0.0.0.0', () => console.log('listening on', PORT));
