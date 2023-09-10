const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorization = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization !== undefined) {
    try {
      const accessToken = authorization.split(' ')[1]
      const token = jwt.verify(accessToken, process.env.SECRET_KEY)
      req.token = token
      next()
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  } else {
    return res.status(401).json({ message: 'Access token undefined' })
  }
}

module.exports = authorization
