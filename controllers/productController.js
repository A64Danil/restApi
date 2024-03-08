const Product = require('../models/productsModel');

const {getPostData, replaceAll } = require('../utils');

const RESPONSE_OBJ = {
    'Content-Type': 'application/json; charset=utf-8',
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "http://localhost:63342",
}

function splitByLineBreaks(str) {
    if(str.indexOf('\n\n') !== -1) {
        str = str.split('\n\n');
    }  else if(str.indexOf('\r\n') !== -1) {
        str = str.split('\r\n\r\n');
    }
    return str
}

// @desc Gets All Products
// @route GET api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, RESPONSE_OBJ);

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
            console.log(product)
            const body = await getPostData(req);
            // console.log('body', body);

            // TODO: пересобрать, удалить логи
            const parsedBodyLikeEntries = body.split('Content-Disposition: form-data; name=')
                .map( string => {
                    const sliceINDEX = string.indexOf('------WebKitFormBoundary');
                    let res = string.slice(0, sliceINDEX);

                    if(res.length <= 1) return [];

                    res = splitByLineBreaks(res);
                    //
                    // console.log("pair")
                    // console.log(res[0])
                    // console.log(res[1])
                    if(res[0]) res[0] = replaceAll(res[0],'"','')
                    if(res[1]) res[1] = res[1].trim();

                    console.log("res1:" + res[1])
                    return res
                })
                .filter( pair => pair.length > 1)


            const params = Object.fromEntries(parsedBodyLikeEntries)
            console.log(params)

            const {title, description, price} = params;
            console.log("Логи:", title, description, price);


            // TODO: переделать на const productData  = { ...product, ...params }
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(id, productData);

            res.writeHead(200, RESPONSE_OBJ)
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