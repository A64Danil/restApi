console.log('test from js - 11:22')

function createListItem(obj) {
    console.log(obj)
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

const URL = 'http://localhost:3000/api/v1/users';
const putForm = document.getElementById('putForm');

putForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newData = new FormData(putForm);
    const userID = newData.get("userID");

    console.log(newData)
    console.log()
    let response = await fetch(URL + userID, {
        method: 'PUT',
        body: newData
    });

    let result = await response.json();

    console.log(result)
})


const usersList = document.querySelector('.usersList');
const usersIDlist = document.querySelector('.usersIDlist');

console.log(usersList);
console.log(usersIDlist);

async function getUser(id) {
    const res = await fetch(URL + "/" + id);
    const user = await res.json();
    return user;
}

function updateForm(user) {
    console.log(user);
    console.log(putForm.elements)
    putForm.elements.nickname.value = user.nickname;
    putForm.elements.email.value = user.email;

}

window.addEventListener('load', async function (){
    console.log('Window was loaded');
    const res = await fetch(URL);

    const result = await res.json();

    // console.log(result)
    result.forEach(el => {
        const item = createListItem(el);
        const option = createOptionItem(el);
        usersList.append(item)
        usersIDlist.append(option)
    });
})


usersIDlist.addEventListener('change', async function (e){
    console.log('user changed');
    console.log(usersIDlist.value);
    const user = await getUser(usersIDlist.value);
    updateForm(user);

})