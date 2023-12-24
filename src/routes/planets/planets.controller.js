const { planets, getAllPlanets } = require("../../models/planets.model");

httpGetAllPlanets = async (req, res) => {
  return res.status(200).json(await getAllPlanets());
};

module.exports = {
  httpGetAllPlanets,
};
