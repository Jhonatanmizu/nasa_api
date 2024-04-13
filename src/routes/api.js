const express = require("express");

const api = express.Router();

const launchesRouter = require("./launches/launches.router");
const planetsRouter = require("./planets/planets.router");

api.use("/v1", planetsRouter);
api.use("/v1", launchesRouter);

module.exports = api;
