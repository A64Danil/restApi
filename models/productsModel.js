const dataArray = require('../data/testData.json');
const { v4: uuidv4 } = require('uuid');

const { writeDataToFile } = require('../utils');

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
        dataArray.push(newProduct);
        writeDataToFile('./data/testData.json', dataArray);
        resolve(newProduct);
    })
}

function update(id, product) {
    return new Promise((resolve, reject)=>{
        const index = dataArray.findIndex( (p) => p.id === id);
        dataArray[index] = {id, ...product};


        writeDataToFile('./data/testData.json', dataArray);
        resolve(dataArray[index]);
    })
}

function remove(id) {
    return new Promise((resolve, reject)=>{
        const filteredData = dataArray.filter(el => el.id !== id);

        writeDataToFile('./data/testData.json', filteredData);
        resolve(filteredData);
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}