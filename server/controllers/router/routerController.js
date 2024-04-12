// const express = require('express');

const errorHandler = require('../../../utils/errorHandler');
const AppError = require('../../../utils/appError');

// let router = express.Router();

const Router = {
    get: (router, path, handler) => {
        // TODO: нужно это как-то вернуть
        router.get(path, async (req, res) => {

            console.log('inside get in router')
            try {
                const data = await handler();
                if (!data || !data.length) {
                    // res.status(404).json({ error: 'Users not found!' });
                    const err = new AppError('Users not found (10-10)', 404);
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
};

module.exports = Router;
