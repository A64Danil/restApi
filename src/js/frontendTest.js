console.log('test from js - 11:22')

function createListItem(obj) {
    const li = document.createElement('li');

    let text = obj.id + " )";

    if(obj.title) text += " " + obj.title;
    if(obj.nickname) text += " " + obj.nickname;

    li.textContent = text;

    return li;
}

function createOptionItem(obj) {
    const option = document.createElement('option');

    let text = obj.id + " )";

    if(obj.title) text += " " + obj.title;
    if(obj.nickname) text += " " + obj.nickname;

    option.value = obj.id;
    option.textContent = text;

    return option;
}

let userID;

const URL = 'http://localhost:3000/api/v1/users';
const putForm = document.getElementById('putForm');
const postForm = document.getElementById('postForm');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newData = new FormData(postForm);

    // создаем пустой объект
    const object = {};
    // перебираем поля формы
    newData.forEach(function (value, key) {
            object[key] = value;
        });
    const json = JSON.stringify(object);
    console.log('sended data', json)
    let response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
    });

    let result = await response.json();
    console.log(result);

    await getUsers();
})

putForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newData = new FormData(putForm);

    console.log(userID)

    // создаем пустой объект
    const object = {};
    // перебираем поля формы
    newData.forEach(function (value, key) {
            object[key] = value;
        });
    const json = JSON.stringify(object);
    console.log('sended data', json)
    let response = await fetch(URL + '/' + userID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
    });

    let result = await response.json();
    console.log(result);

    getUsers();
})


const usersList = document.querySelector('.usersList');
const usersSelect = document.querySelector('.usersSelect');

console.log(usersList);
console.log(usersSelect);

usersSelect.addEventListener('change', function () {
})

async function getUser(id) {
    const res = await fetch(URL + "/" + id);
    const user = await res.json();
    return user;
}

function updateForm(user) {
    console.log(user);
    console.log(putForm.elements)
    putForm.elements.name.value = user.name;
    putForm.elements.email.value = user.email;
    usersSelect.value = user.id;
}

function updateLists(data) {
    usersList.innerHTML = null;
    usersSelect.innerHTML = null;
    data.forEach(el => {
        const item = createListItem(el);
        const option = createOptionItem(el);
        usersList.append(item)
        usersSelect.append(option)
    });

}

async function getUsers(){
    const res = await fetch(URL);

    const result = await res.json();

    // console.log(result)
    updateLists(result);
    updateForm(result[0])
}

window.addEventListener('load', async function (){
    console.log('Window was loaded');
    await getUsers();
})

usersSelect.addEventListener('change', async function (e){
    console.log('user changed');
    console.log(usersSelect.value);
    const user = await getUser(usersSelect.value);
    updateForm(user);


    console.log('change')
    userID = usersSelect.value;
    console.log('userId',userID)

})

class Test {

    #a
    constructor(props) {
        this.#a = '1'
        this.b = undefined;

    }

}

const t = new Test();
console.log(t)