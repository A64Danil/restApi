'use strict';

const express = require('express');
const errorHandler = require('../../utils/errorHandler');
const userService = require('../services/user/user');

const AppError = require('../../utils/appError');

let router = express.Router();

// TODO: перенести в все обработки res.status из сервисов - сюда

// res.status(200).json({
//     status: "success",
//     length: users?.length,
//     data: users,
// });


const Router = {};
Router.get = function (path, handler) {
    router.get(path, async (req, res) => {
        try {
            const data = await handler();
            if (!data || !data.length) {
                // res.status(404).json({ error: 'Users not found!' });
                const err = new AppError('Users not found (from Router)', 404);
                errorHandler(err, req, res)
                return ;
            }
            res.json(data);
        } catch (error) {
            // Обработка ошибки
            const err = new AppError('Internal Server Error', 500);
            errorHandler(err, req, res)
            // res.status(500).json({error: 'Internal Server Error'});
        }
    })
}

Router.get('/', userService.getAllUsers)







// TODO: попробовать использовать errorHandler
// router.get('/', async (req, res) => {
//     try {
//         const users = await userService.getAllUsers();
//         if (!users || !users.length) {
//             // res.status(404).json({ error: 'Users not found!' });
//             const err = new AppError('Users not found', 404);
//             errorHandler(err, req, res)
//             return ;
//         }
//         res.json(users);
//     } catch (error) {
//         // Обработка ошибки
//         const err = new AppError('Internal Server Error', 500);
//         errorHandler(err, req, res)
//         // res.status(500).json({error: 'Internal Server Error'});
//     }
// });

router.get('/:id', userService.getUserById);

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