const { Subscription } = require("../config/mongo");

const create = async (subscription) => {
  try {
    const newSubscription = new Subscription(subscription);
    console.log(newSubscription);
    await newSubscription.save();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const update = async (id, subscription) => {
  try {
    await Subscription.findOneAndUpdate({ _id: id }, subscription);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getAllExpertSubscription = async (expertId) => {
  try {
    return await Subscription.find({ expertId: expertId });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
  //gives all subscription accepted, rejected, completed
};

const getAllClientSubscription = async (clientId) => {
  try {
    return await Subscription.find({ clientId: clientId });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
  //gives all subscription accepted, rejected, completed
};

const getSubscriptionRequests = async (expertId) => {
  try {
    return await Subscription.find({
      expertId: id,
      requestActive: true,
      expertApproved: false,
      acitve: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
  //give expert requests
};

const getByExpert = async (id) => {
  try {
    return await Subscription.find({
      expertId: id,
      // requestActive: false,
      // expertApproved: true,
      // acitve: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
  //give active only
};

const getByClient = async (id) => {
  try {
    return await Subscription.find({
      clientId: id,
      // requestActive: false,
      // expertApproved: true,
      // acitve: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
  //give active only
};

const getBy = async (id) => {
  try {
    return await Subscription.find({ _id: id });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

module.exports = {
  getBy,
  getByClient,
  getByExpert,
  getSubscriptionRequests,
  getAllClientSubscription,
  getAllExpertSubscription,
  update,
  create,
};
