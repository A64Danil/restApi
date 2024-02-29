const fs = require('fs');
// https://github.com/taniarascia/webpack-boilerplate/

// https://github.com/icebob/fakerator

const data = [{
    id: 1,
    text: 't'
}, {
    id: 2,
    text: 't2'
}];

// создаём файл
fs.writeFileSync('data.json', JSON.stringify(data));

// берём старые данные
// eslint-disable-next-line no-shadow
const dbData = JSON.parse(fs.readFileSync('data.json', (err, data) => (data)));

// сливает данные
fs.writeFileSync('data.json', JSON.stringify([...dbData, ...data]));

// читаем файл
// const text = fs.readFileSync('data.json', 'utf8');
// console.log(JSON.parse(text));