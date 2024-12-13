require("dotenv").config();
const mongoose = require("mongoose");
const expertSchema = require("../models/expert");
const userSchema = require("../models/user");
const logger = require("./logger");

main().catch((error) => {
  logger.error(error);
});

async function main() {
  await mongoose.connect(process.env.MONGO);
  logger.info("MongoDB connection established");
}

const Expert = mongoose.model("Expert", expertSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Expert, User };
