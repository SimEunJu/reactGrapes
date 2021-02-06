const http = require('http'); // Import Node.js core module
const url = require('url');

const PREFIX = '/api/grapes';

const server = http.createServer(function (req, res) { 
    
    const reqUrl = url.parse(req.url,true).pathname;
    
    if (reqUrl === (PREFIX + '/local/new')){ //check the URL of the current request
        const queryObject = url.parse(req.url,true).query;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ gno: 1, depth: queryObject.depth}));  
        res.end();  
    }
    else if(reqUrl === (PREFIX + '/1')){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const grape = [];
        for (let index = 0; index < 10; index++) {
            const isTrue = index % 2 === 0;
            grape.push({isChecked: isTrue, content: 'content', title: 'title'});
            
        }
        res.write(JSON.stringify( { gno: 1, depth: 4, title:'test', grapeCnt: 10, grape} ));  
        res.end();  
    }
    else{
        res.end('Invalid Request!');
    }
});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')