'use strict';

const express = require('express');
const userService = require('../services/user/user');

const routerController = require('./router/routerController')


let router = express.Router();
const Router = new routerController(router);

// Router('/', userService.getAllUsers)
Router.get('/', userService.getUsers)
Router.get('/:id', userService.getUserById);

// router.get('/', async (req, res) => {
//     try {
//         const users = await userService.getAllUsers();
//         if (!users || !users.length) {
//             // res.status(404).json({ error: 'Users not found!' });
//             const err = new AppError('Users not found', 404);
//             errorHandler(err, req, res)
//             return ;
//         }
//         console.log('before end of response')
//         res.json(users);
//     } catch (error) {
//         // Обработка ошибки
//         const err = new AppError('Internal Server Error', 500);
//         errorHandler(err, req, res)
//         // res.status(500).json({error: 'Internal Server Error'});
//     }
// });



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