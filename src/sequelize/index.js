'use strict';

const Sequelize = require('sequelize');
const configs = require('../configs/db');
const shortUrlModelDefiner = require('./models/shortUrl.js');

const sequelize = new Sequelize(
  configs.database,
  configs.username,
  configs.password,
  { host: configs.host, port: configs.port, dialect: 'mysql' }
);

shortUrlModelDefiner(sequelize);

module.exports = sequelize;
