console.log('test from js - 20:17')


const URL = 'http://localhost:5000/api/products/8b5ac6dc-1823-48af-a559-cf592bdaf381';
const putForm = document.getElementById('putForm');

console.log(putForm);

let user = {
    name: 'John',
    surname: 'Smith'
};

putForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newData = new FormData(putForm);

    console.log(newData)

    let response = await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
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