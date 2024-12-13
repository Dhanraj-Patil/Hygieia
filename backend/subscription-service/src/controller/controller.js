const router = require("express").Router();
const SubscriptionService = require("../service/subscription");

router.get("/subscription/:subscriptionId", async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const subscription = await SubscriptionService.getBy(subscriptionId);
    res.status(200).json(subscription);
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //get subscription by subscription id
});

router.get("/subscription/requests/:expertId", async (req, res) => {
  try {
    const expertId = req.params.expertId;
    const requests =
      await SubscriptionService.getSubscriptionRequests(expertId);
    res.status(200).json(requests);
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //get experts subscription requests
});

router.get("/subscriptions/expert/:expertId", async (req, res) => {
  try {
    const expertId = req.params.expertId;
    const subscriptions =
      await SubscriptionService.getAllExpertSubscriptions(expertId);
    console.log(subscriptions);
    res.status(200).json(subscriptions);
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //get an experts subscriptions
});

router.get("/subscriptions/all/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const subscriptions =
      await SubscriptionService.getAllClientSubscriptions(clientId);
    console.log(subscriptions);
    res.status(200).json(subscriptions);
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //get a users subscriptions
});

// router.get("/subscription/active/:Id", async (req, res) => {
//   //get an experts or users active subscriptions
//   //need 2 different routes for each
// });

// router.get("/subscriptions/inactive/:Id", async (req, res) => {
//   //get an experts or users inactive subscriptions
//   //need 2 different routes for each
// });

router.post("/subscripton", async (req, res) => {
  try {
    const subscription = req.body;
    await SubscriptionService.create(subscription);
    console.log(subscription);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //create a new subscription (requests are made initially, after transactions subscriptions are active)
});

router.put("/subscription/:subscriptionId", async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const transactionDetails = req.body;
    await SubscriptionService.updateTransaction(
      subscriptionId,
      transactionDetails,
    );
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //update transaction details
});

router.put("/subscriptopn/activate/:subscriptionId", async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const expertResponse = req.body;
    await SubscriptionService.activateSubscription(
      subscriptionId,
      expertResponse,
    );
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //activate or reject a subscription, done by expert
});

router.delete("/subscription/:subscriptionId", async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const reason = req.body;
    await SubscriptionService.disableSubscription(subscriptionId, reason);
  } catch (error) {
    res.json({ status: "BAD", message: error });
  }
  //cancel or complete a subscription
});

module.exports = router;
