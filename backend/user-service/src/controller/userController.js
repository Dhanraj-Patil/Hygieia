const express = require("express");
const router = express.Router();
const UserService = require("../services/userService");
const CreateUserDTO = require("../dto/createUserDTO");
const logger = require("../config/logger");

router.get("/user/all", async (req, res) => {
  try {
    res.json(await UserService.getAll());
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/user", async (req, res) => {
  try {
    const id = req.query.id;
    const user = await UserService.getBy(id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    res.status(404).send("User not found.");
  }
});

router.post("/user", async (req, res) => {
  try {
    const newUser = new CreateUserDTO(req.body);
    logger.info(newUser);
    await UserService.create(newUser);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/user", async (req, res) => {
  try {
    const id = req.query.id;
    await UserService.deleteBy(id);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/user", async (req, res) => {
  try {
    const id = req.query.id;
    const updatedUser = new CreateUserDTO(req.data);
    await UserService.update(id, updatedUser);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
