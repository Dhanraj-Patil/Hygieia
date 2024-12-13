require("dotenv").config();
const mongoose = require("mongoose");
const PackageSchema = require("../model/package");

async function main() {
  await mongoose.connect(process.env.MONGO);
  console.log("MongoDB connection established");
}

await main().catch((error) => {
  console.error(error);
});

const Package = mongoose.model("Package", PackageSchema);

module.exports = { Package };
