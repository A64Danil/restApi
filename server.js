const http = require('http');
const express = require('express');
const router = require("./server/routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler")

const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('./server/controllers/productController');

const fs = require('fs');
const cors = require('cors')
const app = express();

app.use(cors())

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);


// TODO: выяснить почему не прилетает префлайт реквест в экспресс!!!
app.get('/', (req, res) => {
    // response.send('This is about us page')
    res.setHeader('Content-Type', 'text/html');
        fs.readFile('./postTest.html', (err, data) => {
            if (err) {
                console.log(err)
                res.end();
            } else {
                res.end(data);
            }
        });
})


app.get('/api/products', function(req, res, next){
    getProducts(req, res);
});


app.get('/api/products/:id', (req, res) => {
    // Извлекаем ID продукта из URL
    const id = req.params.id;
    // res.send(`Product ID: ${productId}`);
    getProduct(req, res, id);
});

app.post('/api/products', (req, res) => {
    createProduct(req, res);
});

app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    updateProduct(req, res, id);
});

app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    deleteProduct(req, res, id);
});

app.use((req, res, next) => {
    res.status(404).json({'message': 'Route not found'});
});


// TODO: перетащить все функции в экспресс

// const server = http.createServer((req, res) => {
//     console.log("Method - " + req.method)
//     console.log(req.url)
//
//     if (req.method === 'OPTIONS') {
//         res.writeHead(204, {
//             'Content-Type': 'application/json; charset=utf-8',
//             "Access-Control-Allow-Origin": "http://localhost:63342",
//             // "Connection": "keep-alive",
//             "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
//             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Sec-Ch-Ua, Sec-Ch-Ua-Mobile, User-Agent, Content-Type, Referer",
//             "Access-Control-Max-Age": "86400",
//         });
//         res.end();
//     }
//
//     if (req.url === '/' && req.method === 'GET') {
//         // TODO: доделать нормальную функцию
//         console.log('ROOT URL');
//         res.setHeader('Content-Type', 'text/html');
//         fs.readFile('./postTest.html', (err, data) => {
//             if (err) {
//                 console.log(err)
//                 res.end();
//             } else {
//                 res.end(data);
//             }
//         });
//     }
//
// })

const PORT = process.env.PORT || 5000;

app.get('/', (request, response) => {
    response.send('Hello World!')
})

app.listen(PORT, () => {
    console.log('Server running on ' + PORT);
})
