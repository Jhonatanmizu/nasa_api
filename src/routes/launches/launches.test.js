require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { connectDB, disconnectDB } = require("../../db/config");

describe("Launches Api", () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await disconnectDB();
  });
  describe("Test GET /launches", () => {
    test("It should respond with status 200 success", async () => {
      request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
        });
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "random",
      destination: "random",
      launchDate: new Date(),
      rocket: "random rocket",
      target: "Kepler-62 f",
    };

    const launchDataIncomplete = {
      destination: "random",
      rocket: "random rocket",
      target: "Kepler-62 f",
    };

    test("It should respond with status 201 success", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);
    });

    test("It should catch missing required parameters", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataIncomplete)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        message: "Invalid launch",
      });
    });
  });
});
