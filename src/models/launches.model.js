const { launchesModel, planetsModel } = require("../db/schemas");

const getAllLaunches = async () => {
  return await launchesModel.find({}, { _id: 0, __v: 0 });
};

const addNewLaunch = async (launch) => {
  try {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["ZTM", "NASA"],
      flightNumber: newFlightNumber,
    });

    const planet = await planetsModel.findOne({
      keplerName: launch.target,
    });

    if (!planet) {
      throw new Error("No matching planet has been found");
    }
    const result = await launchesModel.findOneAndUpdate(
      { flightNumber: newFlightNumber },
      newLaunch,
      { upsert: true }
    );
    return newLaunch;
  } catch (error) {
    console.error("Error creating launch", error);
  }
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesModel.findOne().sort("-flightNumber");
  return latestLaunch ? latestLaunch.flightNumber : 100;
};

const existsLaunchByFlightNumber = async (flightNumber) => {
  return await launchesModel.findOne({ flightNumber });
};

const abortLaunchByFlightNumber = async (flightNumber) => {
  return await launchesModel.updateOne(
    { flightNumber },
    { success: false, upcoming: false }
  );
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchByFlightNumber,
  abortLaunchByFlightNumber,
};
