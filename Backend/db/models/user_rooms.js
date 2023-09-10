'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  class user_rooms extends Model {
    static associate (models) {
      // eslint-disable-next-line camelcase
      user_rooms.hasMany(models.user_histories, { as: 'resultGames', foreignKey: 'roomId' })
      // eslint-disable-next-line camelcase
      user_rooms.belongsTo(models.user_games, { as: 'player1Games', foreignKey: 'player1Id' })
      // eslint-disable-next-line camelcase
      user_rooms.belongsTo(models.user_games, { as: 'player2Games', foreignKey: 'player2Id' })
    }
  }
  // eslint-disable-next-line camelcase
  user_rooms.init({
    roomName: DataTypes.STRING,
    player1Id: DataTypes.INTEGER,
    player1Choice: DataTypes.STRING,
    player2Id: DataTypes.INTEGER,
    player2Choice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_rooms'
  })
  // eslint-disable-next-line camelcase
  return user_rooms
}
