'use strict';

const crypto = require('node:crypto');

module.exports = () => crypto.randomInt(1500000, Math.pow(62, 8));
