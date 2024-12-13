const express = require("express");
const router = express.Router();
const ExpertService = require("../services/expertService");
const CreateExpertDTO = require("../dto/createExpertDTO");
const logger = require("../config/logger");

router.get("/expert/all", async (req, res) => {
  try {
    const data = await ExpertService.getAll();
    res.json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/expert", async (req, res) => {
  try {
    const id = req.query.id;
    const expert = await ExpertService.getBy(id);
    console.log("Expert fetched");
    res.status(200).json(expert);
  } catch (error) {
    logger.error(error);
    res.status(404).send("Expert not found.");
  }
});

router.post("/expert", async (req, res) => {
  try {
    const newExpert = new CreateExpertDTO(req.body);
    logger.info(`Creating new Expert profile: ${JSON.stringify(newExpert)}`);
    await ExpertService.create(newExpert);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/expert", async (req, res) => {
  try {
    const id = req.query.id;
    await ExpertService.deleteBy(id);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/expert", async (req, res) => {
  try {
    const id = req.query.id;
    const updatedExpert = new CreateExpertDTO(req.data);
    await ExpertService.update(id, updatedExpert);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
