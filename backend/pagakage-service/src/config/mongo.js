require("dotenv").config();
const mongoose = require("mongoose");
const PackageSchema = require("../model/package");

const main = async () => {
  await mongoose.connect(process.env.MONGO);
  console.log("Connection Established to MongoDB.");
};

main().catch((error) => {
  console.error(error);
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = { Package };
