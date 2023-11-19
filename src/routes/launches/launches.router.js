const express = require("express");
const launchesRouter = express.Router();
// Controller
const { httpGetAllLaunches } = require("./launches.controller");

launchesRouter.get("/launches", httpGetAllLaunches);

module.exports = launchesRouter;
