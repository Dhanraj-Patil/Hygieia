const express = require("express");
const logger = require("./src/config/logger");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const cors = require('cors')


app.use(cors({
  // origin: "https://cuddly-loon-heavily.ngrok-free.app"
  origin: "http://localhost:5173"
}))
const AuthMiddleware = require("./src/config/middleware")
app.use(AuthMiddleware)

const userController = require('./src/controller/userController')
const expertController = require('./src/controller/expertContrller')
const utilController = require('./src/controller/utilController')

const swaggerUI = require("swagger-ui-express")
const swaggerSpec = require("./swagger");
app.use("/swagger-ui",swaggerUI.serve, swaggerUI.setup(swaggerSpec))


app.use(express.json())
app.use(userController)
app.use(expertController)
app.use(utilController)

app.get("/", (req, res) => {
  res.send("Welcome to Hygieia")
});

server.listen(port, () => {
  // console.log("Server running on port 3000");
  logger.info("Server running on port 3000.")
});
