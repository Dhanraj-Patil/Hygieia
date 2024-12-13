const logger = require("../config/logger");
const ExpertService = require("../services/expertService");
const UserService = require("../services/userService");

const verify = async (id) => {
  const expert = await ExpertService.getBy(id);
  const user = await UserService.getBy(id);
  logger.info(expert);

  try {
    if (expert) {
      return {
        type: "expert",
        data: await ExpertService.getBy(id),
      };
    } else if (user) {
      return {
        type: "user",
        data: await UserService.getBy(id),
      };
    } else return null;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { verify };
