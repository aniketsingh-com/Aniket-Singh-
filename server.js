const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '127.0.0.1';
const PORT = 3000;
const htmlFile = path.join(__dirname, 'Aniket-Singh.html');

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/') {
    fs.readFile(htmlFile, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Unable to load page.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  if (url === '/image.png') {
    const imagePath = path.join(__dirname, 'image.png');
    fs.stat(imagePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(imagePath).pipe(res);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
