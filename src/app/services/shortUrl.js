'use strict';

const shortUrlRepository = require('../repositories/shortUrl.js');
const idGenerator = require('../lib/idGenerator.js');
const shortUrlIdConverter = require('../lib/shortUrlIdConverter.js');
const configs = require('../../configs/url.js');

class ShortUrlService {
  constructor({
    shortUrlRepository,
    idGenerator,
    shortUrlIdConverter,
    configs,
  }) {
    this.shortUrlRepository = shortUrlRepository;
    this.idGenerator = idGenerator;
    this.shortUrlIdConverter = shortUrlIdConverter;
    this.configs = configs;
  }

  async findById(id) {
    return await this.shortUrlRepository.findById(id);
  }

  async findByShortUrlId(shortUrlId) {
    const id = this.shortUrlIdConverter.decode(shortUrlId);
    return await this.findById(id);
  }

  async create(longUrl) {
    const id = this.idGenerator();
    await this.shortUrlRepository.create(id, longUrl);
    const shortUrlId = this.shortUrlIdConverter.encode(id);
    return this.buildShortUrl(shortUrlId);
  }

  buildShortUrl(shortUrlId) {
    return `${this.configs.domain}/${shortUrlId}`;
  }
}

module.exports = new ShortUrlService({
  shortUrlRepository,
  idGenerator,
  configs,
  shortUrlIdConverter,
});
