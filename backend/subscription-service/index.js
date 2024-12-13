require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const PORT = process.env.PORT;

const SubscriptionController = require("./src/controller/controller");

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS,
  }),
);
app.use(SubscriptionController);

app.get("/", (req, res) => {
  res.send("subscription-service");
});

server.listen(PORT, () => {
  console.log("Server running on port 3002");
});
