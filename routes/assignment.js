const express = require("express");
const router = express.Router();

const AssignmentController = require("../controllers/assignment");
const { isTeacher } = require("../middlewares");

router.post("/", isTeacher, AssignmentController.createAssignment);

router.get("/:id", AssignmentController.getAssignmentsByClassroom);

router.get("/:id", AssignmentController.getAssignmentById);

router.put("/:id", isTeacher, AssignmentController.updateAssignment);

module.exports = router;
