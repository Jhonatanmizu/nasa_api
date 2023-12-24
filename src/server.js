require("dotenv").config();
const http = require("http");
const app = require("./app");
const { loadPlanets } = require("./models/planets.model");
const { connectDB } = require("./db/config");
const PORT = process.env.PORT || 8001;
const server = http.createServer(app);

const runServer = async () => {
  await connectDB();
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
  });
};

runServer();
