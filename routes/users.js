var express = require("express");
var router = express.Router();
const userService = require("../services/userService");
const roleValidation = require("../middlewares/roleValidation");

router.get("/", roleValidation("admin"), async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/activate/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.activateUser(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    await userService.signUp(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await userService.login(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userService.editUser(id, req.body);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userService.removeUser(id);
    res.status(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
