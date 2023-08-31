'use strict';
const redisClient = require('../../redis');
const sequelizeModel = require('../../sequelize').models.shortUrl;

class ShortUrlRepository {
  constructor(redisClient, sequelizeModel) {
    this.redisClient = redisClient;
    this.sequelizeModel = sequelizeModel;
  }

  async findById(id) {
    const redisKey = this.buildRedisKey(id);
    let shortUrl = await this.redisClient.json.get(redisKey, '$');
    if (shortUrl) return shortUrl;

    shortUrl = await this.sequelizeModel.findByPk(id);
    if (!shortUrl) return null;

    await this.redisClient.json.set(redisKey, '$', shortUrl);

    return shortUrl;
  }

  async create(id, longUrl) {
    await this.sequelizeModel.create({ id, longUrl });
    return id;
  }

  buildRedisKey(shortUrlId) {
    return `shortUrl:${shortUrlId}`;
  }
}

module.exports = new ShortUrlRepository(redisClient, sequelizeModel);
