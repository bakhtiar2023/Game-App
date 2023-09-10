'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  class user_bios extends Model {
    static associate (models) {
      // eslint-disable-next-line camelcase
      user_bios.belongsTo(models.user_games, { as: 'user', foreignKey: 'userId' })
    }
  }
  // eslint-disable-next-line camelcase
  user_bios.init({
    userId: DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_bios'
  })
  // eslint-disable-next-line camelcase
  return user_bios
}
