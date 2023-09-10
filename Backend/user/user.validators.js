const { body } = require('express-validator')
const userModel = require('./user.models')
class UserValidator {
  loginValidRules = () => {
    return [
      body('username').notEmpty().withMessage('Please input your username'),
      body('password').notEmpty().withMessage('Please input your password')
    ]
  }

  registrationValidRules = () => {
    return [
      body('username').notEmpty().withMessage('Please input your username'),
      body('email')
        .notEmpty()
        .withMessage('Please input your email')
        .isEmail()
        .withMessage('Invalid email format'),
      body('password')
        .notEmpty()
        .withMessage('Please input your password')
        .isLength({ min: 6 })
        .withMessage('Password min.length 6 character')
    ]
  }

  isUsernameRegistered = async (username) => {
    const result = await userModel.findByUsername(username)
    if (result === null) {
      return false
    }

    if (result?.username?.length > 1) {
      return true
    }

    if (result?.message?.length > 1) {
      return undefined
    }
  }

  isPasswordExist = async (password) => {
    const result = await userModel.findByPassword(password)
    if (result === null) {
      return false
    }

    if (result?.password?.length > 1) {
      return true
    }

    if (result?.message?.length > 1) {
      return undefined
    }
  }

  isEmailExist = async (email) => {
    const result = await userModel.findByEmail(email)
    if (result === null) {
      return false
    } else if (result?.email?.length > 1) {
      return true
    } else {
      return undefined
    }
  }
}

module.exports = new UserValidator()
