'use strict';

const express = require('express');
const url = require('./url.js');
const shortUrlController = require('../controllers/shortUrl.js');

const router = express.Router();

router.use('/api/url', url);

router.get(
  '/:shortUrlId',
  shortUrlController.redirect.bind(shortUrlController)
);

module.exports = router;
