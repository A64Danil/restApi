const dataArray = require('../data/testData.json');
const { v4: uuidv4 } = require('uuid');

function findAll() {
    return new Promise((resolve, reject)=>{
        resolve(dataArray);
    })
}

function findById(id) {
    return new Promise((resolve, reject)=>{
        const product = dataArray.find( item => item.id === id);
        resolve(product);
    })
}

function create(product) {
    return new Promise((resolve, reject)=>{
        const newProduct = {id: uuidv4(), ...product};

        console.log(newProduct);
    })
}

module.exports = {
    findAll,
    findById,
    create
}