const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with status 200 success", async () => {
    request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
  });

  test("It should respond with launches", async () => {});
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "random",
    destination: "random",
    launchDate: new Date(),
    rocket: "random rocket",
  };

  const LaunchDataWithoutDate = {
    mission: "random",
    destination: "random",
    rocket: "random rocket",
  };
  const LaunchDataWithInvalidDate = {
    mission: "random",
    destination: "random",
    rocket: "random rocket",
    launchDate: "zoot",
  };
  test("It should respond with status 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(LaunchDataWithoutDate);
  });

  test("It should catch missing required parameters", async () => {
    const response = await request(app)
      .post("/launches")
      .send(LaunchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      message: "Invalid launch",
    });
  });
});
