const launches = new Map();

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

module.exports = {
  getAllLaunches,
};
