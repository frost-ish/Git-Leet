const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/", UserController.registerUser);

router.post("/login", UserController.loginUser);

router.get("/hello", UserController.sayHello);

module.exports = router;
