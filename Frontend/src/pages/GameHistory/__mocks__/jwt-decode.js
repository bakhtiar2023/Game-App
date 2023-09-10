// __mocks__/jwt-decode.js
module.exports = (token) => {
  // Mock objek token yang didekode berdasarkan kebutuhan Anda
  return {
    id: 163,
    username: 'akunhebat123',
    password: 'Akunhebat123',
    accessToken:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYzLCJ1c2VybmFtZSI6ImFrdW5oZWJhdDEyMyIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDRUMjA6NDc6NDIuNzY0WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDRUMjA6NDc6NDIuNzY0WiIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2OTE2MjUzMjl9.pesRSyNwVFm4f9b8xg7_eHGz54ZHdiUtmP0awjU8Gjc'
    // ... properti lainnya
  }
}
