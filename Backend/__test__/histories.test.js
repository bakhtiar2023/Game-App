const request = require('supertest')
const app = require('../index')

describe("histories", () => {
  //test api get /history/:userId
  describe("get /history/:userId", () => {
    // login token
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsInVzZXJuYW1lIjoiYWJkdWxhaCIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjhUMDg6MjE6NTkuMTMxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMjhUMDg6MjE6NTkuMTMxWiIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2OTE2MDA4NTJ9.S5YfHhcFST_qId_kLK1YpqXeE-S61wdQ8XVBEmZh_fY";
    // login token for userid who doesn't have game history
    const token2 =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY2LCJ1c2VybmFtZSI6ImV4YW1wbGUyMzM0NSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDZUMTQ6NDQ6NDUuNDY4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDZUMTQ6NDQ6NDUuNDY4WiIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2OTE2MDc4NDZ9.BIH4xZ17x7-KeeMX1Z47y-86IiQj1PwSyPNgEMDqDbo";

    test("get /history/:userId return error message for undefined authorization", async () => {
      const response = await request(app).get("/history/1");
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Access token undefined" })
      );
    });
    test("get /history/:userId return error message for null authorization", async () => {
      const response = await request(app)
        .get("/history/1")
        .set({ Authorization: null });
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "jwt must be provided" })
      );
    });
    test("get /history/:userId return error message for not a number parameter", async () => {
      const response = await request(app)
        .get("/history/one")
        .set({ Authorization: token });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "params is not a number" })
      );
    });
    test("get /history/:userId return error message for unauthorized", async () => {
      const response = await request(app)
        .get("/history/1")
        .set({ Authorization: token });
      expect(response.statusCode).toBe(403);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Unauthorized" })
      );
    });
    test("get /history/:userId return error message for not found user history", async () => {
      const response = await request(app)
        .get("/history/166")
        .set({ Authorization: token2 });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "History of game not found" })
      );
    });
    test("get /history/:userId return game history data", async () => {
      const response = await request(app)
        .get("/history/28")
        .set({ Authorization: token });
      expect(response.body).toHaveProperty("message");
      expect(response.body.message[0]).toHaveProperty("status");
      expect(response.body.message[0].status).toBe("win");
      expect(response.body.message[0]).toHaveProperty("player");
    });
  });

  // test api get /generatePdf/:userId
  describe("/generatePdf/:userId", () => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjAwMzc4fQ.4qnd-JYJOiJ3z-HMfFVEIUapEnopgusTm6WpwBbPbfs";

    test("get /generatePdf/:userId return success response", async () => {
      const id = 1;
      const response = await request(app)
        .get(`/generatePdf/${id}`)
        .set({ Authorization: token });
      expect(response.body).toHaveProperty("filename");
      expect(response.body.filename).toBe(
        `D:\\Data Pribadi\\Team1\\backend-team-1\\pdf-generated\\game-history-${id}.pdf`
      );
    });
  });

  //test api post /history/:userId
  describe("POST /history/:userId", () => {
    it('add a history with status "win"', async () => {
      // Masukan No ID
      const userId = 176;
      // Masukan Token Yang Benar
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2LCJ1c2VybmFtZSI6ImV4YW1wbGU1IiwiY3JlYXRlZEF0IjoiMjAyMy0wOC0wN1QxNzoxMDoyMS4yMDVaIiwidXBkYXRlZEF0IjoiMjAyMy0wOC0wN1QxNzoxMDoyMS4yMDVaIiwicm9sZSI6InBsYXllciIsImlhdCI6MTY5MTYwMDk2MX0.WvHmpl0MVd6LDq6ywi2rdVISySPxCA51blexnxAUzfw"; // Replace with an actual access token

      const response = await request(app)
        .post(`/history/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ status: "win" }); // Masukan Status yang benar

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("History successfully added");
    });

    it("return 400 if status is missing or invalid", async () => {
      // Masukan no ID
      const userId = 176;
      // Masukan Token Yang Benar
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2LCJ1c2VybmFtZSI6ImV4YW1wbGU1IiwiY3JlYXRlZEF0IjoiMjAyMy0wOC0wN1QxNzoxMDoyMS4yMDVaIiwidXBkYXRlZEF0IjoiMjAyMy0wOC0wN1QxNzoxMDoyMS4yMDVaIiwicm9sZSI6InBsYXllciIsImlhdCI6MTY5MTYwMDk2MX0.WvHmpl0MVd6LDq6ywi2rdVISySPxCA51blexnxAUzfw"; // Replace with an actual access token

      const response = await request(app)
        .post(`/history/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ status: "adadeh" }); // Masukan status yang salah

      expect(response.status).toBe(400);
    });

    it("invalid token", async () => {
      // masukan userID
      const userId = 163;
      // Masukan token yang salah
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2LCJ1c2VybmFtZSI6ImV4YW1wbGU1IiwiY3JlYXRlZEF0IjoiMjAyMy0wOC0wN1QxNzoxMDoyMS4yMDVaIiwidXBkYXRlZEF0IjoiMjAyMy0wOC0wN1QxNzoxMDoyMS4yMDVaIiwicm9sZSI6InBsYXllciIsImlhdCI6MTY5MTYwMDk2MX0.WvHmpl0MVd6LDq6ywi2rdVISySPxCA51blexnxAUzfw"; // Replace with an actual access token

      const response = await request(app)
        .post(`/history/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ status: "adadeh" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("invalid token");
    });
  });
});
