console.log('test from js - 19:22')

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function removeLineBreaks(str) {
    if(str.indexOf('\n\n') !== -1) {
        str = str.split('\n\n');
    }  else if(str.indexOf('\r\n') !== -1) {
        str = str.split('\r\n\r\n');
    }
    return str
}

const URL = 'http://localhost:5000/api/products/8b5ac6dc-1823-48af-a559-cf592bdaf381';
const putForm = document.getElementById('putForm');

console.log(putForm);

const fData = `------WebKitFormBoundary7KFVcihQEuBPAYer\r\nContent-Disposition: form-data; name=\"title\"\r\n\r\n1907\r\n------WebKitFormBoundary7KFVcihQEuBPAYer\r\nContent-Disposition: form-data; name=\"description\"\r\n\r\n\r\n------WebKitFormBoundary7KFVcihQEuBPAYer\r\nContent-Disposition: form-data; name=\"price\"\r\n\r\n\r\n------WebKitFormBoundary7KFVcihQEuBPAYer--\r\n
`;

const rawEntries = [ [ 'title', 'TEwsf' ], [ 'description', '32' ], [ 'price', '2' ] ];
const myObj = Object.fromEntries(rawEntries);
console.log(myObj);


console.log(fData.split('Content-Disposition: form-data; name='))

const result = fData.split('Content-Disposition: form-data; name=')
    .map( string => {
        const sliceINDEX = string.indexOf('------WebKitFormBoundary');
        let res = string.slice(0, sliceINDEX);

        if(res.length <= 1) return [];

        res = removeLineBreaks(res);


        if(res[0]) res[0] = replaceAll(res[0],'"','')
        if(res[1]) res[1] = res[1].trim();

        // console.log(res)
        return res
    })
    .filter( pair => pair.length > 1)

console.log(result)

// just a test

//
// let user = {
//     name: 'John',
//     surname: 'Smith'
// };
//
// const newUserData = {
//     name: "John Vick",
//     age: 49
// }
//
// const combinedUser = {...user, ...newUserData};

// console.log(combinedUser)

putForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newData = new FormData(putForm);

    console.log(newData)
    let response = await fetch(URL, {
        method: 'PUT',
        body: newData
    });

    let result = await response.json();

    console.log(result)
})


const usersList = document.querySelector('.usersList');

function createItem(obj) {
    const li = document.createElement('li');

    let text = obj.id.slice(0, 6) + " )";

    if(obj.title) text += " " + obj.title;
    if(obj.firstname) text += " " + obj.firstname;

    li.textContent = text;

    return li;
}


window.addEventListener('load', async function (){
    console.log('Window was loaded');
    const res = await fetch('http://localhost:5000/api/products', );

    const result = await res.json();

    result.forEach(el => {
        const item = createItem(el);
        usersList.append(item)
    });
    console.log(result)
})