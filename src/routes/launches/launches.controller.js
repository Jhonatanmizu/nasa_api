const { getAllLaunches } = require("../../models/launches.model");

httpGetAllLaunches = async (req, res) => {
  res.status(200).send(getAllLaunches());
};

module.exports = {
  httpGetAllLaunches,
};
