const dataArray = [{
    "id": "1",
    "random": "9",
    "random float": "56.539",
    "bool": "true",
    "date": "1991-03-08",
    "regEx": "hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo to you",
    "enum": "online",
    "firstname": "Jenda",
    "lastname": "Tarrant",
    "city": "Linz",
    "country": "Christmas Island",
    "countryCode": "CA",
    "email uses current data": "Jenda.Tarrant@gmail.com",
    "email from expression": "Jenda.Tarrant@yopmail.com",
},
    {
        "id": "2",
        "random": "51",
        "random float": "92.026",
        "bool": "true",
        "date": "1982-03-02",
        "regEx": "hellooooooooooooooooooo to you",
        "enum": "json",
        "firstname": "Merci",
        "lastname": "Thad",
        "city": "Pontianak",
        "country": "Puerto Rico",
        "countryCode": "IE",
        "email uses current data": "Merci.Thad@gmail.com",
        "email from expression": "Merci.Thad@yopmail.com",
    },
    {
        "id": "3",
        "random": "70",
        "random float": "30.502",
        "bool": "false",
        "date": "1998-01-09",
        "regEx": "helloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo world",
        "enum": "json",
        "firstname": "Andree",
        "lastname": "Marisa",
        "city": "Rochester",
        "country": "Guinea",
        "countryCode": "BB",
        "email uses current data": "Andree.Marisa@gmail.com",
        "email from expression": "Andree.Marisa@yopmail.com",
    }

];

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