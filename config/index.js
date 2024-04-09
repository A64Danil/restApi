'use strict';

// TODO: сомнительо что тут это нужно
const _ = require('lodash');
const env = process.env.NODE_ENV || 'local';
const envConfig = require('./' + env);

let defaultConfig = {
    env: env
};

//  TODO: Может через Object.assign мы получим то же самое?
module.exports = _.merge(defaultConfig, envConfig);