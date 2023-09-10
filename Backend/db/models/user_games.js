'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  class user_games extends Model {
    static associate (models) {
      // eslint-disable-next-line camelcase
      user_games.hasOne(models.user_bios, { foreignKey: 'userId' })
      // eslint-disable-next-line camelcase
      user_games.hasMany(models.user_histories, { as: 'resultGames', foreignKey: 'userId' })
      // eslint-disable-next-line camelcase
      user_games.hasMany(models.user_rooms, { foreignKey: 'player1Id' })
      // eslint-disable-next-line camelcase
      user_games.hasMany(models.user_rooms, { foreignKey: 'player2Id' })
    }
  }
  // eslint-disable-next-line camelcase
  user_games.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_games'
  })
  // eslint-disable-next-line camelcase
  return user_games
}
