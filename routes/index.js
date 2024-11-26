const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");
const classroomRouter = require("./classroom");
const assignmentRouter = require("./assignment");

const Middlewares = require("../middlewares/index");

router.use("/auth", authRouter);

router.use("/user", Middlewares.userExists, userRouter);

router.use("/classroom", Middlewares.userExists, classroomRouter);

router.use("/assignment", Middlewares.userExists, assignmentRouter);

module.exports = router;
