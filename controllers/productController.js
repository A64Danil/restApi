const Product = require('../models/productsModel');

// @desc Gets All Products
// @route GET api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products))
    } catch (e) {
        console.log(e)
    }
}

// @desc Gets Single Product
// @route GET api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product))
        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getProducts,
    getProduct
}