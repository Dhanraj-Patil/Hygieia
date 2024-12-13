const { Schema } = require("mongoose");

const Package = new Schema({
  expertId: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  sessions: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  updatedOn: Date,
});

module.exports = Package;
