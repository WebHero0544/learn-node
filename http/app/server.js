const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { types } = require('./content-type');

const PORT = 3000;

const server = http.createServer((req, res) => {
	const pathname = url.parse(req.url).pathname;
	const realPath = path.join(__dirname, 'client', pathname);
	let ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'unknown';
	fs.readFile(realPath, (err, data) => {
		if (err) {
			res.writeHead(404, {
				'Content-Type': 'text/html'
			});
			res.write('<!doctype html>\n');
			res.write('<title>404 Not Found</title>\n');
			res.write('<h1>Not Found</h1>');
			res.write(
				'<p>The requested URL ' +
				pathname + 
				' was not found on this server.</p>'
			);
			res.end();
		}else {
			const contentType = types[ext] || "text/plain";
            res.writeHead(200, {
                'Content-Type': contentType
            });
            // res.write(data, "binary");
            res.end(data, "binary");
		}
	});
});
server.listen(PORT);
