const express = require('express')
const app = express()
const userRouter = require('./user/user.routes')
const profileRouter = require('./profiles/profile.routes')
const historyRouter = require('./histories/histories.routes')
const roomRouter = require('./rooms/room.routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello, World!')
})
app.use('/', userRouter, profileRouter, historyRouter, roomRouter)

module.exports = app
