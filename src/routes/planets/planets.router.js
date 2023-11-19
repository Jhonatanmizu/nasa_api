const express = require("express");
const planetsRouter = express.Router();
// Controller
const { httpGetAllPlanets } = require("./planets.controller");

planetsRouter.get("/planets", httpGetAllPlanets);

module.exports = planetsRouter;
