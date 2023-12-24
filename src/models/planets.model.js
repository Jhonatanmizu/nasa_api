const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");
const { planetsModel } = require("../db/schemas");

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanets = () => {
  try {
    return new Promise((resolve, reject) => {
      fs.createReadStream(
        path.resolve(__dirname, "..", "..", "data", "kepler_data.csv")
      )
        .pipe(
          parse({
            comment: "#",
            columns: true,
          })
        )
        .on("data", async (data) => {
          if (isHabitablePlanet(data)) {
            await savePlanet(data);
          }
        })
        .on("error", (err) => {
          console.log(err);
          reject(err);
        })
        .on("end", async () => {
          const countPlanets = await planetsModel.countDocuments();
          console.log(` ${countPlanets} habitable planets found!`);
          resolve();
        });
    });
  } catch (error) {}
};

const savePlanet = async (data) => {
  try {
    await planetsModel.updateOne(
      {
        keplerName: data.kepler_name,
      },
      {
        keplerName: data.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error("Error when we trying to save a planet", error);
  }
};

const getAllPlanets = async () => {
  return await planetsModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
};

module.exports = {
  loadPlanets,
  getAllPlanets,
};
