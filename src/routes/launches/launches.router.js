const express = require("express");
const launchesRouter = express.Router();
// Controller
const {
  httpGetAllLaunches,
  httpPostLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

launchesRouter.get("/launches", httpGetAllLaunches);
launchesRouter.post("/launches", httpPostLaunch);
launchesRouter.delete("/launches/:id", httpDeleteLaunch);

module.exports = launchesRouter;
