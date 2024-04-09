const dataArray = require('../../data/testData.json');
const { v4: uuidv4 } = require('uuid');
const { conn } = require("../services/db");

function findAll() {
    return new Promise((resolve, reject)=>{
        resolve(dataArray);
    })
}

function getAllTest (req, res, next) {
    console.log('inside get all test')
    conn.query("SELECT * FROM citys", function (err, data, fields) {
        if(err) return next(new AppError(err))
        console.log('after if')
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
}

function findInRange(start = 1, end = 10) {
    const maxEnd = dataArray.length;

    if (end > maxEnd) end = maxEnd;

    if(start <= 0 || start > maxEnd) start = 1;

    return new Promise((resolve, reject)=>{
        resolve(dataArray.slice(start - 1, end));
    })
}

function findFromOffset(offset = 0, limit = 10) {
    const maxEnd = dataArray.length;

    if(offset < 0 || offset > maxEnd) offset = 0;
    const start = offset;

    let end = offset + limit;
    if(end > maxEnd) end = maxEnd - start;

    return new Promise((resolve, reject)=>{
        resolve(dataArray.slice(start, end));
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
    getAllTest,
    findAll,
    findInRange,
    findFromOffset,
    findById,
    create,
    update,
    remove
}