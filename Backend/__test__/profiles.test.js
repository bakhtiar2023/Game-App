const request = require("supertest");
const app = require("../index");

describe("profiles", () => {
  //test api put /profile/:userId
  describe("put /profile/:userId", () => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc3LCJ1c2VybmFtZSI6ImthbWEiLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTA5VDAyOjAwOjA2LjcyMloiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTA5VDAyOjAwOjA2LjcyMloiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjA4Mjg5fQ.0Hvl8tDG8tTaAZ6OLsQNvltqVLuEW6_HLbL_dCW0OXA";
    const token2 =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY4LCJ1c2VybmFtZSI6ImV4YW1wbGUyNTM0NSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDZUMTQ6NTE6MjAuNjIyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDZUMTQ6NTE6MjAuNjIyWiIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2OTE2MTE0NTh9.Vi1FxHiylDEnAfPlyEzhQF3LFxeTzGeDNiE4FDeQKW8";

    test("put /profile/:userId return error message for invalid phone number", async () => {
      const response = await request(app)
        .put("/profile/1")
        .set({ Authorization: token })
        .send({ phoneNumber: "0898123" });
      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Unauthorized");
    });

    test("put /profile/:userId return error message for invalid date of birth", async () => {
      const response = await request(app)
        .put("/profile/177")
        .set({ Authorization: token })
        .send({ dateOfBirth: "1978-03-15" });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toHaveProperty("dateOfBirth");
      expect(response.body.message.dateOfBirth).toBe(
        "Invalid format, input use: dd-mm-yyyy"
      );
    });

    test("put /profile/:userId return success response create profile user", async () => {
      const response = await request(app)
        .put("/profile/177")
        .set({ Authorization: token2 })
        .send({ dateOfBirth: "21-03-2021" });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Biodata successfully added");
    });

    test("put /profile/:userId return success response update profile user", async () => {
      const response = await request(app)
        .put("/profile/177")
        .set({ Authorization: token })
        .send({ dateOfBirth: "13-12-1945" });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Biodata successfully added");
    });
  });

  //test api get /photo/:userId
  describe("put /photo/:userId", () => {
    it("update photoprofile user", async () => {
      // Masukan No ID
      const userId = 1;
      // Masukan Access Token
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjA4NDMyfQ.3SdDYT3_iEdmRfgGoMNlX_QmGLuBveccij2710Yrxrw"; // Replace with an actual access token
      // Masukan Gambar
      const url = "https://example.com/profile.jpg";

      const response = await request(app)
        .put(`/photo/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ url });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Photo successfully uploaded");
    });

    it("return 400 if the URL (Image PhotoProfile) is missing", async () => {
      // Masukan No ID
      const userId = 1;
      // Masukan Access Token
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjA4NDMyfQ.3SdDYT3_iEdmRfgGoMNlX_QmGLuBveccij2710Yrxrw"; // Replace with an actual access token

      const response = await request(app)
        .put(`/photo/${userId}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message.url).toBe("url shouldn't empty");
    });

    it("return 401 if access token is missing", async () => {
      //  Masukan No ID
      const userId = 163;
      // Masukan Gambar
      const url = "https://example.com/profile.jpg";

      const response = await request(app).put(`/photo/${userId}`).send({ url });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Access token undefined");
    });
  });

  //test api get /profile/:userId   
  describe("get /profile/:userId ", () => {
    const expiredToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjg5MTc1NDc4LCJleHAiOjE2ODkyNjE4Nzh9.XXRmYjLqwbFK_0nALG2Ii6wkn7usrXVXkXNOZ2r4N18";
    const testToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU1LCJ1c2VybmFtZSI6ImV4YW1wbGUxMjMiLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTA0VDE3OjMwOjA1Ljk1MFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTA0VDE3OjMwOjA1Ljk1MFoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjAwNDY0fQ.bTwVvLdKF6ZYvXD9fUrluCkKs1LbHl2xbNsiX1nULKs";
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhY2htYWQiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDA5OjIyOjM1Ljk4OVoiLCJyb2xlIjoicGxheWVyIiwiaWF0IjoxNjkxNjAwMzc4fQ.4qnd-JYJOiJ3z-HMfFVEIUapEnopgusTm6WpwBbPbfs";
    const testToken2 =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY2LCJ1c2VybmFtZSI6ImV4YW1wbGUyMzM0NSIsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDZUMTQ6NDQ6NDUuNDY4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDZUMTQ6NDQ6NDUuNDY4WiIsInJvbGUiOiJwbGF5ZXIiLCJpYXQiOjE2OTE2MDc4NDZ9.BIH4xZ17x7-KeeMX1Z47y-86IiQj1PwSyPNgEMDqDbo";

    test("get /profile/:userId return error message for undefined or null authorization", async () => {
      const response = await request(app)
        .get("/profile/1")
        .set({ Authorization: null });
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "jwt must be provided" })
      );
    });
    test("get /profile/:userId return error message for expired token", async () => {
      const response = await request(app)
        .get("/profile/1")
        .set({ Authorization: expiredToken });
      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "jwt expired" })
      );
    });
    test("get /profile/:userId return error message for wrong id params", async () => {
      const response = await request(app)
        .get("/profile/2")
        .set({ Authorization: testToken });
      expect(response.statusCode).toBe(403);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Unauthorized" })
      );
    });
    test("get /profile/:userId return error message for empty biodata user", async () => {
      const response = await request(app)
        .get("/profile/166")
        .set({ Authorization: testToken2 });
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(
        expect.objectContaining({ message: "Biodata not found" })
      );
    });
    test("get /profile/:userId return success response", async () => {
      const response = await request(app)
        .get("/profile/1")
        .set({ Authorization: token });
      expect(response.statusCode).toBe(200);
      expect(response.body.message.user.userId).toBe(1);
      expect(response.body.message).toHaveProperty("address");
    });
  });
});
