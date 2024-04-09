'use strict';

// const registerController = require('../../controllers/apis/register');
// const loginController = require('../../controllers/apis/login');
// const dashboardController = require('../../controllers/apis/dashboard');
const productController = require('../../controllers/productController');
const userController = require('../../controllers/userController');
const express = require('express');

let router = express.Router();

// TODO: конкретно это место это жесть оно не так долджно работать
router.use('/test', productController.getProducts)

// TODO: подключить позднее
// router.use('/register', registerController);
router.use('/users', userController);
// router.use('/login', loginController);
// router.use('/dashboard', dashboardController);

module.exports = router;