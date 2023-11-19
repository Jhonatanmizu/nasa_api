const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8001;
const server = http.createServer(app);

const { loadPlanets } = require("./models/planets.model");

const runServer = async () => {
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
  });
};

runServer();
