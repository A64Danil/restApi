// const express = require('express');

const errorHandler = require('../../../utils/errorHandler');
const AppError = require('../../../utils/appError');

// let router = express.Router();
class routerController {
    constructor(router) {
        this.router = router;
    }

    get(path, handler) {
        console.log(handler.name)
        this.router.get(path, async (req, res) => {
            try {
                const data = await handler(req, res);
                console.log(data)

                // isArray
                const isArray = Array.isArray(data);
                if(isArray && !data.length) {
                    const err = new AppError('Users not found (10-35)', 404);
                    errorHandler(err, req, res)
                    return ;
                } else if (!data) {
                    // res.status(404).json({ error: 'Users not found!' });
                    const err = new AppError('User not found', 404);
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
}

module.exports = routerController;
