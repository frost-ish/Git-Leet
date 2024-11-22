const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");

const Middlewares = require("../middlewares/index");

router.use("/auth", authRouter);

router.use("/user", Middlewares.userExists, userRouter);

module.exports = router;