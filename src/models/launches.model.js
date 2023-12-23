const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  destination: "Kepler-442 b",
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  flightNumber: 100,
  customers: ["Nasa", "MySpace"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  return Array.from(launches.values());
};

const addNewLaunch = (launch) => {
  latestFlightNumber++;
  launches.set(
    launch.flightNumber,
    Object.assign(launch, {
      upcoming: true,
      success: true,
      customers: ["ZTM", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
};

const existsLaunchByFlightNumber = (flightNumber) => {
  return launches.has(flightNumber);
};

const abortLaunchByFlightNumber = (flightNumber) => {
  const aborted = launches.get(flightNumber);
  aborted.upcoming = false;
  aborted.success = false;
  launches.set(flightNumber, aborted);
  return aborted;
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchByFlightNumber,
  abortLaunchByFlightNumber,
};
