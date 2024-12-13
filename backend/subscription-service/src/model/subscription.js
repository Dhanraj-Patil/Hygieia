const { Schema } = require("mongoose");

const Subscription = new Schema({
  expertId: String,
  expertType: String,
  clientId: String,
  packageName: String,
  subscriptionDate: {
    type: Date,
    default: new Date(),
  },
  transactionId: String,
  transactionStatus: String,
  transactionDate: Date,
  requestActive: {
    type: Boolean,
    default: true,
  },
  expertApproved: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  // deactivationReason: {
  //   type: String,
  //   enum: ["CANCELLED", "COMPLETED"],
  // },
  deactivationDate: Date,
});

module.exports = Subscription;
