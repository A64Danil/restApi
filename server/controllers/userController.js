'use strict';

const express = require('express');
const userService = require('../services/user/user');

const routerController = require('./router/routerController')


let router = express.Router();
const Router = new routerController(router);

Router.get('/', userService.getUsers)
Router.post('/', userService.createUser)


Router.get('/:id', userService.getUserById);
Router.put('/:id', userService.updateUserById);


// router.get('/', (req, res) => {
//     const id = req.params.id;
//     // Теперь вы можете использовать переменную id для выполнения необходимых действий,
//     // например, передать его в функцию userService.getUserByName()
//     userService.getUserByName(id)
//         .then(user => {
//             // Обработка успешного выполнения запроса
//             res.json(user);
//         })
//         .catch(error => {
//             // Обработка ошибки
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// });

module.exports = router;