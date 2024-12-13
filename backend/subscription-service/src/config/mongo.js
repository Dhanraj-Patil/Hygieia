require("dotenv").config();
const mongoose = require("mongoose");
const SubscriptionSchema = require("../model/subscription");

async function main() {
  await mongoose.connect(process.env.MONGO);
  console.log("MongoDB connection established");
}

main().catch((error) => {
  console.error(error);
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = { Subscription };
