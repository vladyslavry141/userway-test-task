'use strict';

const shortUrlService = require('../services/shortUrl.js');
const ajv = require('../lib/ajv.js');

const SHORT_URL_CREATE_BODY_SCHEMA_ID = '#url/create';

const shortUrlCreateBodySchema = {
  $id: SHORT_URL_CREATE_BODY_SCHEMA_ID,
  type: 'object',
  properties: {
    url: { type: 'string', format: 'uri' },
  },
  required: ['url'],
};

ajv.addSchema(shortUrlCreateBodySchema);

class ShortUrlController {
  constructor(shortUrlService) {
    this.shortUrlService = shortUrlService;
  }

  async create(req, res) {
    const validateBodyFn = ajv.getSchema(SHORT_URL_CREATE_BODY_SCHEMA_ID);

    const isBodyValid = validateBodyFn(req.body);

    const errorMessage = { message: 'Invalid URL' };
    if (!isBodyValid) {
      return res.status(400).json(errorMessage);
    }

    const shortUrl = await this.shortUrlService.create(req.body.url);

    return res.status(200).json({ shortUrl });
  }

  async redirect(req, res) {
    const shortUrlId = req.params.shortUrlId;
    const shortUrl = await this.shortUrlService.findByShortUrlId(shortUrlId);

    if (!shortUrl) return res.status(404).json({ message: 'Not found' });

    return res.redirect(shortUrl.longUrl);
  }
}

module.exports = new ShortUrlController(shortUrlService);
