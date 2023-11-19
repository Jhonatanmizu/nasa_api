const { planets } = require("../../models/planets.model");

httpGetAllPlanets = async (req, res) => {
  return res.status(200).json(planets);
};

module.exports = {
  httpGetAllPlanets,
};
