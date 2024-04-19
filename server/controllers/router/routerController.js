// const express = require('express');

const { getReturnedDataName } = require('../../../utils/helpers');
const errorHandler = require('../../../utils/errorHandler');
const AppError = require('../../../utils/appError');

// let router = express.Router();
class routerController {
    constructor(router) {
        this.router = router;
    }

    get(path, handler) {
        const dataName = getReturnedDataName(handler.name);
        this.router.get(path, async (req, res) => {
            try {
                const data = await handler(req, res);

                const isArray = Array.isArray(data);
                if(isArray && !data.length) {
                    const err = new AppError(`${dataName} not found`, 404);
                    errorHandler(err, req, res)
                    return ;
                } else if (!data) {
                    const err = new AppError(`${dataName} not found`, 404);
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

    put(path, handler) {
        const dataName = getReturnedDataName(handler.name);
        this.router.put(path, async (req, res) => {
            try {
                const data = await handler(req, res);

                if (!data) {
                    const err = new AppError(`${dataName} not found`, 404);
                    errorHandler(err, req, res)
                    return ;
                }

                res.json(data);
            } catch (error) {
                const err = new AppError('Internal Server Error', 500);
                errorHandler(err, req, res)
            }
        })


    }

    post(path, handler) {
        const dataName = getReturnedDataName(handler.name);

        this.router.post(path, async (req, res) => {
            try {
                const data = await handler(req, res);

                // https://www.npmjs.com/package/class-validator

                if (typeof data === 'string') {
                    const err = new AppError(`${data}`, 409);
                    errorHandler(err, req, res)
                    return ;
                }

                res.status(201).json(data);
            } catch (error) {
                const err = new AppError('Internal Server Error', 500);
                errorHandler(err, req, res)
            }
        })


    }

    delete(path, handler) {
        const dataName = getReturnedDataName(handler.name);

        this.router.delete(path, async (req, res) => {
            try {
                const data = await handler(req, res);

                if (!data) {
                    const err = new AppError(`${dataName} not found`, 404);
                    errorHandler(err, req, res)
                    return ;
                }

                res.status(204).send();
            } catch (error) {
                const err = new AppError('Internal Server Error', 500);
                errorHandler(err, req, res)
            }
        })


    }
}

module.exports = routerController;
