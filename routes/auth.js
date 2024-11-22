const UserController = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/", UserController.registerUser);

router.post("/login", UserController.loginUser);

module.exports = router;
