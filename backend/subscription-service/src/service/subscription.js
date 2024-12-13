const SubscriptionRepository = require("../repository/subscription");

const getBy = async (id) => {
  return await SubscriptionRepository.getBy(id);
};

const getSubscriptionRequests = async (expertId) => {
  return await SubscriptionRepository.getSubscriptionRequests(expertId);
};

const getSubscriptionsBy = async (expertId) => {};

const getAllClientSubscriptions = async (clientId) => {
  return await SubscriptionRepository.getByClient(clientId);
};

const getAllExpertSubscriptions = async (expertId) => {
  return await SubscriptionRepository.getByExpert(expertId);
};

const updateTransaction = async (subscriptionId, transactionDetails) => {
  //get the subscription by id and then update it with transaction details before saving it
  const subscription = await SubscriptionRepository.getBy(subscriptionId);
  subscription.transaction = transactionDetails;
  await SubscriptionRepository.update(subscriptionId, transactionDetails);
};

const create = async (subscription) => {
  await SubscriptionRepository.create(subscription);
};

const activateSubscription = async (subscriptionId, expertsResponse) => {
  const subscription = SubscriptionRepository.getBy(subscriptionId);
  subscription.expertApproved = expertsResponse;
  subscription.requestActive = false;
  await SubscriptionRepository.update(subscriptionId, subscription);
};

const disableSubscription = async (subscriptionId, reason) => {
  const subscription = SubscriptionRepository.getBy(subscriptionId);
  subscription.active = false;
  subscription.deactivationReason = reason;
  await SubscriptionRepository.update(subscriptionId, subscription);
};

module.exports = {
  updateTransaction,
  create,
  disableSubscription,
  getSubscriptionsBy,
  getBy,
  getSubscriptionRequests,
  getAllExpertSubscriptions,
  getAllClientSubscriptions,
  activateSubscription,
};
