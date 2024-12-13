const { Expert } = require("../config/mongoose");
const logger = require("../config/logger");

const create = async (data) => {
  try {
    const expert = new Expert(data);
    await expert.save();
  } catch (error) {
    logger.error(`Creating expert record to database failed. Reason: ${error}`);
    throw error;
  }
};

const getAll = async () => {
  try {
    return await Expert.find().exec();
  } catch (error) {
    logger.error(
      `Fetching all expert records from the database failed. Reason: ${error}`,
    );
  }
};

const getBy = async (email) => {
  try {
    const expert = await Expert.findOne({ email: email }).exec();
    console.log(expert);
    return expert;
  } catch (error) {
    logger.error(`Fetching expert by email-id failed. Reason: ${error}`);
  }
};

const deleteBy = async (email) => {
  try {
    await Expert.deleteOne({ emal: email });
  } catch (error) {
    logger.error(`Expert deletion failed. Reason: ${error}`);
  }
};

const update = async (id, data) => {
  try {
    await Expert.updateOne({ _id: id }, data);
  } catch (error) {
    logger.error(`Expert updation failed. Reason: ${error}`);
  }
};
module.exports = { create, getAll, getBy, deleteBy };
