const request = require('supertest')
const app = require('../index')

describe('rooms', () => {
  // api get all rooms
  describe('/all_rooms/:page', () => {

    const expiredToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjg5MTc1NDc4LCJleHAiOjE2ODkyNjE4Nzh9.XXRmYjLqwbFK_0nALG2Ii6wkn7usrXVXkXNOZ2r4N18'
    const testToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU1LCJ1c2VybmFtZSI6ImV4YW1wbGUxMjMiLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTA0VDE3OjMwOjA1Ljk1MFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTA0VDE3OjMwOjA1Ljk1MFoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjAwNDY0fQ.bTwVvLdKF6ZYvXD9fUrluCkKs1LbHl2xbNsiX1nULKs'
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjAwMzc4fQ.4qnd-JYJOiJ3z-HMfFVEIUapEnopgusTm6WpwBbPbfs'
        
      test('/all_rooms/:page should return error message for undefined or null authorization', async () => {
        const response = await request(app).post('/all_rooms/1').set({ Authorization: null })
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({ message: 'jwt must be provided' }))
      })
      test('/all_rooms/:page should return error message for expired token', async () => {
        const response = await request(app).post('/all_rooms/1').set({ Authorization: expiredToken })
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({ message: 'jwt expired' }))
      })
      test('/all_rooms/:page should return success response with empty body', async () => {
        const response = await request(app).post('/all_rooms/1').set({ Authorization: testToken })
        expect(response.statusCode).toBe(200)
        expect(response.body.message[0].roomId).toBe(2)
      })
      test('/all_rooms/:page should return error message with wrong format of filtered request body', async () => {
        const response = await request(app).post('/all_rooms/1').set({ Authorization: token }).send({ filtered: 123123 })
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toEqual(expect.objectContaining({ filtered: 'please input filtered with boolean true or false' }))
      })
      test('/all_rooms/:page should return success response with true value of filtered request body', async () => {
        const response = await request(app).post('/all_rooms/1').set({ Authorization: token }).send({ filtered: true })
        expect(response.statusCode).toBe(200)
        expect(response.body.message.length).toBeGreaterThan(1)
        expect(response.body.message[0]).toHaveProperty('roomId')
      })
      test('/all_rooms/:page should return success response with false value of filtered request body', async () => {
        const response = await request(app).post('/all_rooms/1').set({ Authorization: token }).send({ filtered: false })
        expect(response.statusCode).toBe(200)
        expect(response.body.message.length).toBeGreaterThan(1)
        expect(response.body.message[0]).toHaveProperty('roomId')
        expect(response.body.message[0].roomId).toBe(2)
      })
  })
  
  // test API create rooms
  describe('POST /create_rooms', () => {

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY1LCJ1c2VybmFtZSI6Imx1a2FzIGVuZW1iZSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDVUMTE6NDY6MjEuNTUxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDVUMTE6NDY6MjEuNTUxWiIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2OTE0MDkwMDZ9.1KpISj3vu66h2g0Qg1IoeGyKosl6aFsEEGx4Ebss8IE'

    test('should create a new room and response status 200', async () => {
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })
        .send({
          roomName: 'Roomku264',
          player1Choice: 'rock'
        })

      // Check if the response status is 200 and contains the success message
      expect(response.statusCode).toBe(200)
      expect(response).not.toBeNull()
      expect(response.body).toEqual(expect.objectContaining({ message: 'Room successfully created' }))
    })
    test('should get response 400 when roomName already used   ', async () => {
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })
        .send({ roomName: 'Roomku128', player1Choice: 'paper' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: 'roomName already used' }))
    })
    test('should get response 400 when roomName is empty ', async () => {
      const roomData = {
        roomName: '',
        player1Choice: 'paper'
      }
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })

        .send(roomData)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: { roomName: 'Please input roomName' } }))
    })

    test('should get response 400 when player1Choice is empty ', async () => {
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })
        .send({ roomName: 'roomku129', player1Choice: '' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: { player1Choice: 'Please input your choice as player 1' } }))
    })
    test('should get response 400 when player1Choice input is invalid', async () => {
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })
        .send({ roomName: 'roomku199', player1Choice: 'rick' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: { player1Choice: 'Choice contain : rock/paper/scissors' } }))
    })
    test('should get response 400 when player1Choice and roomName is empty ', async () => {
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })
        .send({})
      console.log(response.body.message)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: { roomName: 'Please input roomName' } }))
    })
    test('should get response 400 when player1Choice and roomName is empty ', async () => {
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })
        .send({})

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: { roomName: 'Please input roomName' } }))
    })

    test('should get response 401 and response message invalid signature when accessToken invalid ', async () => {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY1LCJ1c2VybmFtZSI6Imx1a2FzIGVuZW1iZSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDVUMTE6NDY6MjEuNTUxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDVUMTE6NDY6MjEuNTUxWiIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2OTEyMzU5OTEsImV4cCI6MTY5MTMyMjM5MX0.HDKa6Oq2HR0wgNIXraLg7iB_9njclMt1t350OsI-y-'
      const response = await request(app)
        .post('/create_rooms')
        .set({ Authorization: token })
        .send({ roomName: 'roomku137', player1Choice: 'rock' })

      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(expect.objectContaining({ message: 'invalid signature' }))
    })
  })

  // test API get room id
  describe('GET /get_rooms/:id ', () => {
    test('should get response 404 when game rooms not found', async () => {
      const response = await request(app)
        .get('/get_rooms/1')
        .set({ Authorization: token })

      expect(response.statusCode).toBe(404)
    })
    test('should get response 404 when id  do not input in url', async () => {
      const response = await request(app)
        .get('/get_rooms/')
        .set({ Authorization: token })

      expect(response.statusCode).toBe(404)
    })
    test('should get response 200 when success to get one rooms', async () => {
      const response = await request(app)
        .get('/get_rooms/2')
        .set({ Authorization: token })

      expect(response.statusCode).toBe(200)
      expect(response).not.toBeNull()
      expect(response.body.message.roomId).toBe(2)
      expect(response.body.message).toHaveProperty('roomId')
      expect(response.body.message).toHaveProperty('roomName')
      expect(response.body.message).toHaveProperty('player1Id')
      expect(response.body.message).toHaveProperty('player2Id')
      expect(response.body.message).toHaveProperty('resultGames')
    })
    test('should get response 401 and response message invalid signature when accessToken invalid ', async () => {
      // invalid token
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInVzZXJuYW1lIjoicm9uZGExMjMiLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTAxVDAxOjEwOjA5LjAzOVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTAxVDAxOjEwOjA5LjAzOVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxMzI3OTk2LCJleHAiOjE2OTE0MTQzOTZ9.Z_rP7SWXrFYsmgT-z8Zv_RN-2KfymIGARKudXnGecx'
      const response = await request(app)
        .get('/get_rooms/2')
        .set({ Authorization: token })

      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(expect.objectContaining({ message: 'invalid signature' }))
    })
    test('should get response 401 and response message is expired token', async () => {
      // invalid token
      const ExpiredToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInVzZXJuYW1lIjoicXdlcnR5IiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yOFQxMzoyMTowNS45ODdaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0yOFQxMzoyMTowNS45ODdaIiwicm9sZSI6InBsYXllciIsImlhdCI6MTY4ODE1MjQyNywiZXhwIjoxNjg4MjM4ODI3fQ.3SPCnMSaXgQ9Jg1TatqHhdJdPoo0dB_j9ZjCo0T0QVo'
      const response = await request(app)
        .get('/get_rooms/2')
        .set({ Authorization: ExpiredToken })

      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(expect.objectContaining({ message: 'jwt expired' }))
    })
  })

  // test api edit_rooms
  describe('/edit_rooms', () => {

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc3LCJ1c2VybmFtZSI6ImthbWEiLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTA5VDAyOjAwOjA2LjcyMloiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTA5VDAyOjAwOjA2LjcyMloiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjA4Mjg5fQ.0Hvl8tDG8tTaAZ6OLsQNvltqVLuEW6_HLbL_dCW0OXA'
    const expiredToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjg5MTc1NDc4LCJleHAiOjE2ODkyNjE4Nzh9.XXRmYjLqwbFK_0nALG2Ii6wkn7usrXVXkXNOZ2r4N18'
    const unBearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxMzE4MTcxLCJleHAiOjE2OTE0MDQ1NzF9.gOrrafBwfoNHHDEkTUE3lJ0cEAhZQwiIgVRJhqUR-tA'

    test('/edit_rooms/:roomId should return error message for undefined or null auth', async () => {
      const response = await request(app).put('/edit_rooms/1').set({ Authorization: null })
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(
        expect.objectContaining({ message: 'jwt must be provided' })
      )
    })
  
    test('/edit_rooms/:roomId should return error message for expired token', async () => {
      const response = await request(app).put('/edit_rooms/1').set({ Authorization: expiredToken })
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(expect.objectContaining({ message: 'jwt expired' })
      )
    })
  
    test('/edit_rooms/:roomId should return error message for undefined authorized', async () => {
      const response = await request(app).put('/edit_rooms/1').send({player2Choice:'paper'})
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(expect.objectContaining({ message: 'Access token undefined' }))
    })
  
    test('/edit_rooms/:roomId should return error message for unauthorized', async () => {
      const response = await request(app).put('/edit_rooms/1').set({ Authorization: unBearerToken })
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(expect.objectContaining({ message: 'jwt must be provided' }))
    })
  
    test('/edit_rooms/:roomId return error message for NaN params', async () => {
      const response = await request(app).put('/edit_rooms/two').set({ Authorization: token }).send({ player2Choice: 'rock' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: 'params not a number' }))
    })
  
    test('/edit_rooms/:roomId return error message for wrong input player2Choice', async () => {
      const response = await request(app).put('/edit_rooms/155').set({ Authorization: token }).send({ player2Choice: 'thumb' })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toEqual(expect.objectContaining({ player2Choice: 'Choice contain : rock/paper/scissors' }))
    })
  
    test('/edit_rooms/:roomId return error message for undefined player2Choice', async () => {
      const response = await request(app).put('/edit_rooms/155').set({ Authorization: token })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toEqual(expect.objectContaining({ player2Choice: 'Please input your choice as player 2' }))
    })
  
    test('/edit_rooms/:roomId return error message for wrong roomId', async () => {
      const response = await request(app).put('/edit_rooms/1').set({ Authorization: token })
      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual(expect.objectContaining({ message: 'Room not found' }))
    })
  
    test('/edit_rooms/:roomId return error message if player1Id = player2Id', async () => {
      const response = await request(app).put('/edit_rooms/174').set({ Authorization: token }).send({ player2Choice: 'rock' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({ message: 'You Cant input choice as player2' }))
    })
    // Below roomId Should change with any room in condition null as player2Choice and rock as player1Choice
    test('/edit_rooms/:roomId return success response', async () => {
      const response = await request(app).put('/edit_rooms/206').set({ Authorization: token }).send({ player2Choice: 'rock' })
      // console.log(response)
      // expect(true).toBe(true)
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toHaveProperty('status')
      expect(response.body.message.gameRoom).toHaveProperty('roomName')
    })
    // Below roomId Should change with any room in condition null as player2Choice and rock as player1Choice
    test('/edit_rooms/:roomId return success response', async () => {
      const response = await request(app).put('/edit_rooms/207').set({ Authorization: token }).send({ player2Choice: 'paper' })
      console.log(response)
      // expect(true).toBe(true)
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toHaveProperty('status')
      expect(response.body.message.gameRoom).toHaveProperty('roomName')
    })
    // Below roomId Should change with any room in condition null as player2Choice and rock as player1Choice
    test('/edit_rooms/:roomId return success response', async () => {
      const response = await request(app).put('/edit_rooms/208').set({ Authorization: token }).send({ player2Choice: 'scissors' })
      console.log(response)
      // expect(true).toBe(true)
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toHaveProperty('status')
      expect(response.body.message.gameRoom).toHaveProperty('roomName')
    })
    // Below roomId Should change with any room in condition null as player2Choice and scissors as player1Choice
    test('/edit_rooms/:roomId return success response', async () => {
      const response = await request(app).put('/edit_rooms/239').set({ Authorization: token }).send({ player2Choice: 'rock' })
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toHaveProperty('status')
      expect(response.body.message.gameRoom).toHaveProperty('roomName')
    })
    // Below roomId Should change with any room in condition null as player2Choice and scissors as player1Choice
    test('/edit_rooms/:roomId return success response', async () => {
      const response = await request(app).put('/edit_rooms/240').set({ Authorization: token }).send({ player2Choice: 'paper' })
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toHaveProperty('status')
      expect(response.body.message.gameRoom).toHaveProperty('roomName')
    })
    // Below roomId Should change with any room in condition null as player2Choice and paper as player1Choice
    test('/edit_rooms/:roomId return success response', async () => {
      const response = await request(app).put('/edit_rooms/232').set({ Authorization: token }).send({ player2Choice: 'rock' })
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toHaveProperty('status')
      expect(response.body.message.gameRoom).toHaveProperty('roomName')
    })
    // Below roomId Should change with any room in condition null as player2Choice and paper as player1Choice
    test('/edit_rooms/:roomId return success response', async () => {
      const response = await request(app).put('/edit_rooms/257').set({ Authorization: token }).send({ player2Choice: 'scissors' })
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toHaveProperty('status')
      expect(response.body.message.gameRoom).toHaveProperty('roomName')
    })
  })
})