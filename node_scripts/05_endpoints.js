const http = require('http');

const requestHandler = (req, res) => {
    if(req.url === '/hello') {
        res.setHeader('Content-Type','application/json');
        res.writeHead(200);
        res.end('Hello World from the route "/hello"');
    }

    else if(req.url === '/byebye') {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end('Bye from the route "/byebye"');
    }

    else{
        res.end(`Try to use localhost:${PORT}/hello in the navbar`)
    }
};

const PORT = 3000;
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Hello!!! Server started in http//localhost:${PORT}`);
});