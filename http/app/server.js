const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { types } = require('./content-type');

const PORT = 3000;

const server = http.createServer((req, res) => {
	req.setEncoding('utf8');  //对请求对象指定编码
	const pathname = url.parse(req.url).pathname;  //获取请求地址

	// console.log(url.parse(req.url));

	if (pathname.search(/\.\w+/) !== -1) {  // 静态文件(以有后缀名为根据)
		const realPath = path.join(__dirname, 'client', pathname);  //转化为文件所在的磁盘路径
		let ext = path.extname(realPath);
		ext = ext ? ext.slice(1) : 'unknown';
		fs.readFile(realPath, (err, data) => {
			if (err) {
				res.writeHead(404, {
					'Content-Type': 'text/html'
				});
				res.write(`<!doctype html>\n`);
				res.write(`<title>404 Not Found</title>\n`);
				res.write(`<h1>Not Found</h1>`);
				res.write(`<p>The requested URL ${pathname} was not found on this server.</p>`);
				res.write(`<p>error: ${JSON.stringify(err)}</p>`);
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
	}else {  // ajax接口(相反，以没有后缀名为根据)
		ajaxInterface(pathname, req, res);
	}

});
server.listen(PORT);



function ajaxInterface (pathname, req, res) {
	var iname = pathname.slice(1);
	console.log(iname);
	switch (iname) {
		case 'indexData':
			_wh(200);
			const data = {
				status: 'success',
				code: 2,
				data: {
					xxx: 'xxx',
					yyy: 'yyy'
				}
			};
			res.end(JSON.stringify(data));
			break;
		case 'aboutData':
			_wh(200);
			res.end('aboutData');
			break;
		default:
			_wh(500);
			res.end('The interface does not exist');
			break;
	}
	function _wh (statusCode) {
		res.writeHead(statusCode, {'Content-Type': 'application/json'});
	}
}
