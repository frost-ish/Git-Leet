const { Assignment } = require("../models");

const createAssignment = async (req, res) => {
	const { name, description, dueDate } = req.body;

	if (!name || !description) {
		res.status(400).json({
			message: "ERROR",
		});
		return;
	}

	const assignment = await Assignment.create({ name, description, dueDate });

	res.status(201).json({
		message: "Assignment Created Successfully",
		assignment,
	});
};

const getAssignmentsByClassroom = async (req, res) => {
	const { id } = req.params;

	const assignments = await Assignment.findAll({
		where: {
			classroomId: id,
		},
	});

	res.status(200).json({
		assignments,
	});
};

const getLeaderBoardForAssignment = async (req, res) => {
	const { id } = req.params;

	const assignment = await Assignment.findByPk(id, {
		include: "students",
	});

	// Create a map of student vs questions completed
	for (const student of assignment.students) {
		const questionsCompleted = await student.getQuestions({
			where: {
				assignmentId: id,
			},
		});
		student.questionsCompleted = questionsCompleted.length;
	}

	// Sort students by questions completed
	assignment.students.sort(
		(a, b) => b.questionsCompleted - a.questionsCompleted
	);

	res.status(200).json({
		assignment,
	});
};

const getAssignmentById = async (req, res) => {
	const { id } = req.params;

	const assignment = await Assignment.findByPk(id);

	if (!assignment) {
		res.status(404).json({
			message: "Assignment not found",
		});
		return;
	}

	res.status(200).json({
		assignment,
	});
};

const updateAssignment = async (req, res) => {
	const { id } = req.params;
	const { name, description, dueDate } = req.body;

	const assignment = await Assignment.findByPk(id);

	if (!assignment) {
		res.status(404).json({
			message: "Assignment not found",
		});
		return;
	}

	assignment.name = name;
	assignment.description = description;
	assignment.dueDate = dueDate;

	await assignment.save();

	res.status(200).json({
		message: "Assignment updated successfully",
	});
};

module.exports = {
	createAssignment,
	getAssignmentsByClassroom,
	getLeaderBoardForAssignment,
	getAssignmentById,
	updateAssignment,
};
