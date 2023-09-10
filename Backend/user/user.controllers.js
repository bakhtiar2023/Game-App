const { validationResult } = require('express-validator')
const userModel = require('./user.models')
const userValidator = require('./user.validators')
const jwt = require('jsonwebtoken')
require('dotenv').config()
class UserController {
  getLogin = async (req, res) => {
    const { username, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }

    if (username !== undefined && password !== undefined) {
      const resultUsername = await userValidator.isUsernameRegistered(username)
      if (resultUsername === false) {
        return res.status(400).json({ message: 'Username not valid' })
      } else if (resultUsername === undefined) {
        return res.status(500).json({ message: 'Internal server error' })
      }

      const resultPassword = await userValidator.isPasswordExist(password)
      if (resultPassword === false) {
        return res.status(400).json({ message: 'Password not valid' })
      } else if (resultPassword === undefined) {
        return res.status(500).json({ message: 'Internal server error' })
      }

      const resultLogin = await userModel.loginWithUsername(username, password)
      if (resultLogin === null) {
        return res.status(400).json({ message: 'User not registered' })
      } else if (resultLogin === undefined) {
        return res.status(500).json({ message: 'Internal server error' })
      }

      const token = jwt.sign(
        { ...resultLogin, role: 'player' },
        process.env.SECRET_KEY
      )
      return res.status(200).json({ accessToken: 'Bearer' + ' ' + token })
    }

    return res.status(400).json({ message: 'Use username for login' })
  }

  getRegister = async (req, res) => {
    const { username, email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: { [errors.array()[0].path]: errors.array()[0].msg } })
    }

    const resultUsername = await userValidator.isUsernameRegistered(username)
    if (resultUsername === true) {
      return res.status(400).json({ message: 'Username already used' })
    } else if (resultUsername === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    const resutlEmail = await userValidator.isEmailExist(email)
    if (resutlEmail === true) {
      return res.status(400).json({ message: 'Email already used' })
    } else if (resutlEmail === undefined) {
      return res.status(500).json({ message: 'Internal server error' })
    }

    const created = await userModel.createAccount(username, email, password)
    if (created === true) {
      return res.status(200).json({ message: 'Registration successful' })
    }
    return res.status(500).json({ message: created })
  }
}

module.exports = new UserController()
