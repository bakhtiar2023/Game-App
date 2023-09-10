const request = require("supertest");
const app = require("../index");

describe("users", () => {
  describe("post /login", () => {
    // test api /login
    test("/login should return error message undefined or null username ", async () => {
      const response = await request(app)
        .post("/login")
        .send({ password: "1231231" });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.objectContaining({ username: "Please input your username" })
      );
    });

    test("/login should return error message undefined or null password", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "haland", password: null });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.objectContaining({ password: "Please input your password" })
      );
    });

    test("/login should return error message wrong username", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "achmads", password: "1231231" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Username not valid" })
      );
    });

    test("/login should return error message wrong password", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "achmad", password: "123123123123" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Password not valid" })
      );
    });

    test("/login should return success message statusCode 200 and accessToken", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "achmad", password: "1231231" });
      expect(response.statusCode).toBe(200);
      expect(response.body.accessToken.split(" ")[0]).toBe("Bearer");
    });
  });

  //test api post /registration
  describe("post /registration", () => {
    test("/registration should return error message for undefined or null username", async () => {
      const response = await request(app)
        .post("/registration")
        .send({ email: "example@gmail.com", password: "1231231" });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.objectContaining({ username: "Please input your username" })
      );
    });
    test("/registration should return error message for undefined or null email", async () => {
      const response = await request(app)
        .post("/registration")
        .send({ username: "example1", password: "Inipassword1" });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.objectContaining({ email: "Please input your email" })
      );
    });
    test("/registration should return error message for invalid email format", async () => {
      const response = await request(app)
        .post("/registration")
        .send({
          username: "example1",
          email: "example1",
          password: "Inipassword1",
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.objectContaining({ email: "Invalid email format" })
      );
    });
    test("/registration should return error message for undefined or null password", async () => {
      const response = await request(app)
        .post("/registration")
        .send({ username: "example1", email: "example1@gmail.com" });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.objectContaining({ password: "Please input your password" })
      );
    });
    test("/registration should return error message for password length less than six characters", async () => {
      const response = await request(app)
        .post("/registration")
        .send({
          username: "example1",
          email: "example1@gmail.com",
          password: "passw",
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual(
        expect.objectContaining({ password: "Password min.length 6 character" })
      );
    });
    test("/registration should return error message for username already used", async () => {
      const response = await request(app)
        .post("/registration")
        .send({
          username: "abdulah",
          email: "example1@gmail.com",
          password: "inipassword1",
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Username already used" })
      );
    });
    test("/registration should return error message for email already used", async () => {
      const response = await request(app)
        .post("/registration")
        .send({
          username: "example1",
          email: "abdulah@gmail.com",
          password: "inipassword1",
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Email already used" })
      );
    });
    test("/registration should return success message", async () => {
      const response = await request(app)
        .post("/registration")
        .send({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Registration successful" })
      );
    });
  });
});
