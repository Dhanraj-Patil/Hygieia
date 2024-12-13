require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT;
const cors = require("cors");

const packageController = require("./src/controller/package");

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS,
  }),
);
app.use(packageController);

app.get("/package", (req, res) => {});

server.listen(PORT, () => {
  console.log("Server running on port 3001.");
});
