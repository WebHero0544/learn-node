const net = require('net');
 
const PORT = 3000;
const HOST = '127.0.0.1';
 
// tcp服务端
const server = net.createServer(socket => {

    console.log('服务端：收到来自客户端的请求');

    socket.on('data', data => {
        console.log('服务端：收到客户端数据，内容为{'+ data +'}');
        // 给客户端返回数据
        socket.write('你好，我是服务端');
    });
 
    socket.on('close', () => {
         console.log('服务端：客户端连接断开');
		// server.close();  //当客户端连接断开时关闭服务
    });
});

server.listen(PORT, HOST, () => {
    console.log('服务端：开始监听来自客户端的请求');
	console.log('服务启动在：', server.address());
	console.log('服务端是否在监听:' + server.listening);
});
server.on('listening', () => {
	console.log('服务端在监听');
});
// 服务关闭事件
server.on('close', () => {
	console.log('服务端已停止服务!')
});