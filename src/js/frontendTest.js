console.log('test from js - 20:17')

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const URL = 'http://localhost:5000/api/products/8b5ac6dc-1823-48af-a559-cf592bdaf381';
const putForm = document.getElementById('putForm');

console.log(putForm);

const fData = ` ------WebKitFormBoundaryF8wYxOgKGA9HlXDa
Content-Disposition: form-data; name="title"

w45
------WebKitFormBoundaryF8wYxOgKGA9HlXDa
Content-Disposition: form-data; name="description"

324
------WebKitFormBoundaryF8wYxOgKGA9HlXDa
Content-Disposition: form-data; name="price"

234
------WebKitFormBoundaryF8wYxOgKGA9HlXDa--
`;

const rawEntries = [ [ 'title', 'TEwsf' ], [ 'description', '32' ], [ 'price', '2' ] ];
const myObj = Object.fromEntries(rawEntries);
console.log(myObj);


console.log(fData.split('Content-Disposition: form-data; name='))

const result = fData.split('Content-Disposition: form-data; name=')
    .map( string => {
        const sliceINDEX = string.indexOf('------WebKitFormBoundary');
        console.log(sliceINDEX);
        const res = string.slice(0, sliceINDEX).trim().split('\n\n');

        res[0] = replaceAll(res[0],'"','')

        console.log(res)
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
    // TODO: загуглить как работает new FormData();
    let response = await fetch(URL, {
        method: 'PUT',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        body: newData
    });

    let result = await response.json();
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