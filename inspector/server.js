const http = require('http');

const hostname = '127.0.0.1';
const port = 4000;
debugger;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  res.write('xxxxxxxxxxxxxx');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
