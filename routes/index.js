const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");
const classroomRouter = require("./classroom");
const assignmentRouter = require("./assignment");
const questionRouter = require("./question");

const Middlewares = require("../middlewares/index");

router.use("/auth", authRouter);

router.use("/user", Middlewares.userExists, userRouter);

router.use("/classroom", Middlewares.userExists, classroomRouter);

router.use("/assignment", Middlewares.userExists, assignmentRouter);

router.use("/question", Middlewares.userExists, questionRouter);

module.exports = router;
