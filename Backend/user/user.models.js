/* eslint-disable camelcase */
const { user_games } = require('../db/models')
const md5 = require('md5')
const { Op } = require('sequelize')

class UserModel {
  findByUsername = async (username) => {
    try {
      const data = await user_games.findOne({ where: { username } })
      if (data === null) {
        return null
      }
      return data.dataValues
    } catch (error) {
      return error
    }
  }

  findByPassword = async (password) => {
    try {
      const data = await user_games.findOne({ where: { password: md5(password) } })
      if (data === null) {
        return null
      }
      return data.dataValues
    } catch (error) {
      return error
    }
  }

  loginWithUsername = async (userUsername, password) => {
    try {
      const data = await user_games.findOne({
        attributes: { exclude: ['password', 'email'] },
        where: {
          [Op.and]: [{ username: userUsername }, { password: md5(password) }]
        }
      })
      if (data.dataValues.length < 1) {
        return null
      }
      return data.dataValues
    } catch (error) {
      return undefined
    }
  }

  createAccount = async (userUsername, userEmail, userPassword) => {
    try {
      await user_games.create({ username: userUsername, email: userEmail, password: md5(userPassword) })
      return true
    } catch (error) {
      return error
    }
  }

  findByEmail = async (email) => {
    try {
      const data = await user_games.findOne({ where: { email } })
      if (data === null) {
        return null
      }
      return data.dataValues
    } catch (error) {
      return error
    }
  }
}

module.exports = new UserModel()
