'use strict';

require('dotenv').config();

const express = require('express');
const config = require('./configs/express.js');
const router = require('./app/routes/router.js');
const sequelize = require('./sequelize');
const redis = require('./redis');

const port = config.port;
const app = express();

module.exports = app;

app.use(express.json());
app.use('/', router);

let server;

new Promise(async (resolve, reject) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await redis.connect();
  } catch (error) {
    reject(error);
  }

  server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  resolve();
}).catch((error) => {
  console.error('Error initializing ' + error);

  sequelize
    .close()
    .catch((error) => console.error('Error on close sequelize ' + error));

  redis.quit().catch((error) => console.error('Error on quit redis ' + error));

  server?.close(() => {
    console.debug('HTTP server closed');
  });
});

process.on('SIGTERM', () =>
  new Promise(async (resolve) => {
    console.debug('SIGTERM signal received: closing HTTP server');

    server.close(() => {
      console.debug('HTTP server closed');
    });

    const closingResults = await Promise.allSettled([
      sequelize.close(),
      redis.quit(),
    ]);

    for (const res of closingResults) {
      if (res.status === 'fulfilled') continue;

      console.error('Error on shutdown ' + res.reason);
    }
    resolve();
  })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error on shutdown ' + error);
      process.exit(1);
    })
);
