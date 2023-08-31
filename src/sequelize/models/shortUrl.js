const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('shortUrl', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    longUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
