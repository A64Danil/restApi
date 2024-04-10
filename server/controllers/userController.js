'use strict';

const express = require('express');
const userService = require('../services/user/user');

let router = express.Router();

// TODO: перенести в все обработки res.status из сервисов - сюда

router.get('/', userService.getAllUsers);
router.get('/:id', userService.getUserById);

module.exports = router;