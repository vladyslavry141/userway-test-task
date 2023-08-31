'use strict';

const express = require('express');
const router = express.Router();
const shortUrlController = require('../controllers/shortUrl.js');

router.post('/create', shortUrlController.create.bind(shortUrlController));

module.exports = router;
