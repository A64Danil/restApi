const http = require('http');
const {getProducts, getProduct, createProduct, updateProduct} = require('./controllers/productController');

const fs = require('fs');


const server = http.createServer((req, res) => {
    console.log("Method - " + req.method)
    console.log(req.url)

    if (req.method === 'OPTIONS') {
        // res.setHeader('Content-Type', 'text/html');
        console.log('inside options')
        // TODO: change 200 to 204
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin": "http://localhost:63342",
            // "Connection": "keep-alive",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Sec-Ch-Ua, Sec-Ch-Ua-Mobile, User-Agent, Content-Type, Referer",
            "Access-Control-Max-Age": "86400",
        });
        res.end();
    }

    if (req.url === '/' && req.method === 'GET') {
        // TODO: доделать нормальную функцию
        console.log('ROOT URL');
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('./postTest.html', (err, data) => {
            if (err) {
                console.log(err)
                res.end();
            } else {
                res.end(data);
            }
        });
    } else if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        console.log('try to get some ID', id);
        getProduct(req, res, id);
    } else if (req.url === '/api/products' && req.method === 'POST') {
        console.log('try to POST some')
        createProduct(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && (req.method === 'OPTIONS' || req.method === 'PUT')) {
        const id = req.url.split('/')[3];
        console.log('try to update ID', id);
        updateProduct(req, res, id);
    } else {
        console.log('not found, inside else-condiiton')
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'Route not found'}))
    }

})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log('Server running on ' + PORT);
})

