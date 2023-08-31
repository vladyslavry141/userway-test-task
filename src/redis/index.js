'use strict';

const redis = require('redis');
const configs = require('../configs/redis.js');

const client = redis.createClient({ url: configs.url });

module.exports = client;
