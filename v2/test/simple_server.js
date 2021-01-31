const http = require('http'); // Import Node.js core module
const url = require('url');

const PREFIX = '/api/grapes';

const server = http.createServer(function (req, res) { 
    console.log(url.parse(req.url,true).pathname);  //create web server
    const reqUrl = url.parse(req.url,true).pathname;
    if (reqUrl === (PREFIX + '/local/new')){ //check the URL of the current request
        const queryObject = url.parse(req.url,true).query;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ gno: 1, depth: queryObject.depth}));  
        res.end();  
    }
    else{
        res.end('Invalid Request!');
    }
});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')