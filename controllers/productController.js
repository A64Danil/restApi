const Product = require('../models/productsModel');

const { getPostData } = require('../utils');

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

// @desc Create A Product
// @route POST api/products
async function createProduct(req, res) {
    try {

        const body = await getPostData(req);
        console.log('body', body);

        const urlParams = new URLSearchParams(body);
        const params = Object.fromEntries(urlParams)
        // const { title, description, price } = JSON.parse(params);
        const { title, description, price } = params;
        console.log(title, description, price);


        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product);
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(newProduct))
    } catch (e) {
        console.log(e)
    }
}

// @desc Update A Product
// @route PUT api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }));
        } else {
            const body = await getPostData(req);
            console.log('body', body);

            const urlParams = new URLSearchParams(body);
            const params = Object.fromEntries(urlParams)
            // const { title, description, price } = JSON.parse(params);
            const { title, description, price } = params;
            console.log(title, description, price);


            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updProduct))
        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
}