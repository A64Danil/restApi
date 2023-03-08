const http = require('http');
const { getProducts, getProduct } = require('./controllers/productController')



const server = http.createServer((req, res) => {
    console.log(req.method)

    if(req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        console.log('try to get some ID', id);
        getProduct(req, res, id)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'message': 'Route not found'}))
    }

})

const PORT =  process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log('Server running on ' + PORT);
})

