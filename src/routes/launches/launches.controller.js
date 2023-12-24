const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchByFlightNumber,
  abortLaunchByFlightNumber,
} = require("../../models/launches.model");

httpGetAllLaunches = async (req, res) => {
  const launches = await getAllLaunches();
  res.status(200).send(launches);
};

httpPostLaunch = async (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.rocket ||
    !launch.destination
  ) {
    isInvalid = true;
    return res.status(400).send({ message: "Invalid launch" });
  }

  launch.launchDate = new Date();
  const result = await addNewLaunch(launch);
  res.status(201).send(result);
};

httpDeleteLaunch = async (req, res) => {
  const launchId = Number(req.params.id);
  const exists = existsLaunchByFlightNumber(launchId);
  // if launch does not exist
  if (!exists) return res.status(404).send({ message: "Launch not found" });

  const aborted = abortLaunchByFlightNumber(launchId);
  return res.status(200).json(aborted);
};

module.exports = {
  httpGetAllLaunches,
  httpPostLaunch,
  httpDeleteLaunch,
};
