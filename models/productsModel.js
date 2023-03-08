const dataArray = require('../data/testData.json')

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

module.exports = {
    findAll,
    findById
}