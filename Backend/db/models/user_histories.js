'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  class user_histories extends Model {
    static associate (models) {
      // eslint-disable-next-line camelcase
      user_histories.belongsTo(models.user_games, { as: 'player', foreignKey: 'userId' })
      // eslint-disable-next-line camelcase
      user_histories.belongsTo(models.user_rooms, { as: 'gameRoom', foreignKey: 'roomId' })
    }
  }
  // eslint-disable-next-line camelcase
  user_histories.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_histories'
  })
  // eslint-disable-next-line camelcase
  return user_histories
}
