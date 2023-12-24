const { Schema, SchemaTypes, model } = require("mongoose");

const launchSchema = new Schema({
  destination: { type: SchemaTypes.String, required: true },
  mission: { type: SchemaTypes.String, required: true },
  rocket: { type: SchemaTypes.String, required: true },
  launchDate: { type: SchemaTypes.Date, required: true },
  flightNumber: {
    type: SchemaTypes.Number,
    required: true,
  },
  target: {
    required: true,
    type: SchemaTypes.String,
  },
  customers: { type: SchemaTypes.Array, default: [] },
  upcoming: { type: SchemaTypes.Boolean, required: true, default: true },
  success: { type: SchemaTypes.Boolean, required: true, default: true },
});

const planetSchema = new Schema({
  keplerName: { type: SchemaTypes.String, required: true },
});

const launchesModel = model("Launch", launchSchema);
const planetsModel = model("Planets", planetSchema);

module.exports = {
  launchesModel,
  planetsModel,
};
