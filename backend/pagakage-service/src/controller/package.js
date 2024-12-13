const router = require("express").Router();
const PackageService = require("../service/package");

router.post("/package", async (req, res) => {
  try {
    const newPackage = req.body;
    await PackageService.create(newPackage);
    console.log(newPackage);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error" });
  }
});

router.get("/package/:expertId", async (req, res) => {
  try {
    const expertId = req.params.expertId;
    res.status(200).json(await PackageService.getPackagesBy(expertId));
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error" });
  }
});

router.put("/package", async (req, res) => {
  try {
    const expertId = req.body.email;
    const packageName = req.body.packageName;
    const packageUpdate = req.body.update;
    await PackageService.updateBy(expertId, packageName, packageUpdate);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error" });
  }
});

router.delete("/package", async (req, res) => {
  try {
    const expertId = req.body.email;
    const packageName = req.body.packageName;
    await PackageService.deleteBy(expertId, packageName);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ status: "Internal Server Error" });
  }
});

module.exports = router;
