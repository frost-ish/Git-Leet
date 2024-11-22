const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/hello", UserController.sayHello);

module.exports = router;
