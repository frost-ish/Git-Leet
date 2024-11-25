const express = require("express");
const router = express.Router();

const QuestionController = require("../controllers/question");
const { isTeacher, isStudent } = require("../middlewares");

router.post("/", isTeacher, QuestionController.addQuestionToAssignment);
router.get("/:id", QuestionController.getQuestionsByAssignment);
router.delete(
	"/:id",
	isTeacher,
	QuestionController.removeQuestionFromAssignment
);
router.post(
	"/:id/completed",
	isStudent,
	QuestionController.markQuestionAsCompleted
);

module.exports = router;
