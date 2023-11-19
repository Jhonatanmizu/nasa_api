const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
// Routers
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
// Setup
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Planets
app.use(planetsRouter);
app.use(launchesRouter);

module.exports = app;
