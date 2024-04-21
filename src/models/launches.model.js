const { launchesModel, planetsModel } = require("../db/schemas");
const AxiosService = require("../services/axios.service");

const spaceXApi = new AxiosService(process.env.SPACE_X_API);

const getAllLaunches = async () => {
  return await launchesModel.find({}, { _id: 0, __v: 0 });
};

const addNewLaunch = async (launch) => {
  try {
    const planet = await planetsModel.findOne({
      keplerName: launch.target,
    });

    if (!planet) {
      throw new Error("No matching planet has been found");
    }
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["ZTM", "NASA"],
      flightNumber: newFlightNumber,
    });

    const result = await launchesModel.findOneAndUpdate(
      { flightNumber: newFlightNumber },
      newLaunch,
      { upsert: true }
    );
    return result;
  } catch (error) {
    console.error("Error creating launch", error);
  }
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesModel.findOne().sort("-flightNumber");
  return latestLaunch ? latestLaunch.flightNumber : 100;
};
const findLaunch = async (filter) => {
  return await launchesModel.findOne(filter);
};
const existsLaunchByFlightNumber = async (flightNumber) => {
  return await findLaunch({ flightNumber });
};

const abortLaunchByFlightNumber = async (flightNumber) => {
  return await launchesModel.updateOne(
    { flightNumber },
    { success: false, upcoming: false }
  );
};
const saveLaunch = async (launch) => {
  await launchesModel.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};
const populateLaunches = async () => {
  console.log("downloading lauch data");
  const response = await spaceXApi.handlePost("/launches/query", {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  const launchDocs = response.data.docs;

  const launches = [];

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => payload["customers"]);
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    await saveLaunch(launch);
    launches.push(launch);
  }
  console.log("🚀 ~ loadLaunches ~ response:", launches);
};
const loadLaunches = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("🚀 ~ loadLaunches ~ firstLaunch:", firstLaunch);
  } else {
    await populateLaunches();
  }
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchByFlightNumber,
  abortLaunchByFlightNumber,
  loadLaunches,
};
