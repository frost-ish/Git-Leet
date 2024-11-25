const { Question, User } = require("../models");

const addQuestionToAssignment = async (req, res) => {
	const { assignmentId, question } = req.body;
	if (!assignmentId || !question) {
		res.status(400).json({
			message: "ERROR",
		});
		return;
	}
	const questionCreated = await Question.create({ assignmentId, question });
	res.status(201).json({
		message: "Question Created Successfully",
		questionCreated,
	});
};

const getQuestionsByAssignment = async (req, res) => {
	const { id } = req.params;

	const questions = await Question.findAll({
		where: {
			assignmentId: id,
		},
	});

	res.status(200).json({
		questions,
	});
};

const removeQuestionFromAssignment = async (req, res) => {
	const { id } = req.params;

	const question = await Question.findByPk(id);

	if (!question) {
		res.status(404).json({
			message: "Question not found",
		});
		return;
	}

	await question.destroy();

	res.status(200).json({
		message: "Question deleted successfully",
	});
};

const markQuestionAsCompleted = async (req, res) => {
	const { id } = req.params;

	const question = await Question.findByPk(id);

	if (!question) {
		res.status(404).json({
			message: "Question not found",
		});
		return;
	}

	const user_email = req.user.email;
	const user = await User.findByPk(user_email);
	const student = await user.getStudent();

	await student.addQuestion(question);

	res.status(200).json({
		message: "Question marked as completed",
	});
};

module.exports = {
	addQuestionToAssignment,
	getQuestionsByAssignment,
	removeQuestionFromAssignment,
	markQuestionAsCompleted,
};
