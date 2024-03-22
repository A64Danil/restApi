const Product = require('../server/models/productsModel');

const {getPostData, formDataToObj, parseIntObj} = require('../utils');

const RESPONSE_OBJ = {
    'Content-Type': 'application/json; charset=utf-8',
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "http://localhost:63342",
}

// @desc Gets All Products
// @route GET api/products
async function getProducts(req, res) {
    try {
        const {start, end, offset, limit } = parseIntObj(req.query);

        let products;

        if(start >=0 && end >= 0) {
            products = await Product.findInRange(start, end);
        } else if (offset >= 0 && limit >= 0) {
            products = await Product.findFromOffset(offset, limit);
        } else {
            // products = await Product.findAll();
            products = await Product.getAllTest(req, res);
        }

        // res.writeHead(200, RESPONSE_OBJ);

        // res.end(JSON.stringify(products))
    } catch (e) {
        console.log(e)
    }
}

// @desc Gets Single Product
// @route GET api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, RESPONSE_OBJ);
            res.end(JSON.stringify({message: 'Product not found'}))
        } else {
            res.writeHead(200, RESPONSE_OBJ);
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
        const {title, description, price} = params;
        console.log(title, description, price);


        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product);
        res.writeHead(201, RESPONSE_OBJ)
        res.end(JSON.stringify(newProduct))
    } catch (e) {
        console.log(e)
    }
}

// @desc Update A Product
// @route PUT api/products/:id
async function updateProduct(req, res, id) {
    console.log('updateProduct')
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, RESPONSE_OBJ);
            res.end(JSON.stringify({message: 'Product not found'}));
        } else {
            const body = await getPostData(req);
            // console.log('body', body);

            const formDataObj = formDataToObj(body);
            const productData  = { ...product, ...formDataObj }
            const updProduct = await Product.update(id, productData);

            res.writeHead(200, RESPONSE_OBJ)
            res.end(JSON.stringify(updProduct))
        }

    } catch (e) {
        console.log(e)
    }
}

// @desc Delete Single Product
// @route DELETE api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, RESPONSE_OBJ);
            res.end(JSON.stringify({message: 'Product not found'}))
        } else {
            const products = await Product.remove(id);
            res.writeHead(200, RESPONSE_OBJ);
            res.end(JSON.stringify(products))
        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}