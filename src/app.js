const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
// Api
const api = require("./routes/api");
// Setup
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(api);

module.exports = app;
