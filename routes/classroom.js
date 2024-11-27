const express = require("express");
const router = express.Router();
const ClassroomController = require("../controllers/classroom");
const { isStudent, isTeacher } = require("../middlewares");

router.post("/", isTeacher, ClassroomController.createClassroom);

router.get("/", isTeacher, ClassroomController.getClassrooms);

router.get("/:id", ClassroomController.getClassroomById);

router.get(
	"/:id/students",
	isTeacher,
	ClassroomController.getStudentsForClassroom
);

router.post("/:id/join", isStudent, ClassroomController.joinClassroom);

router.get("/student", isStudent, ClassroomController.getClassroomsForStudent);

router.get("/teacher", isTeacher, ClassroomController.getClassroomsForTeacher);

module.exports = router;
