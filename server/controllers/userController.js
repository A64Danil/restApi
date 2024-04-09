'use strict';

const express = require('express');
const userService = require('../services/user/user');

let router = express.Router();


router.get('/', userService.getAllUsers);

module.exports = router;