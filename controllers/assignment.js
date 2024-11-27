const { Assignment, Student } = require("../models");

const createAssignment = async (req, res) => {
    const { title, link, description, classroomId, dueDate } = req.body;

    if (!title || !link || !dueDate || !classroomId) {
        res.status(400).json({
            message: "ERROR",
        });
        return;
    }

    const assignment = await Assignment.create({
        title,
        link,
        description,
        classroomId,
        dueDate,
    });

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

const markAssignmentAsCompleted = async (req, res) => {
    const { assignmentId, userEmail } = req.body;

    const assignment = await Assignment.findByPk(assignmentId);

    if (!assignment) {
        res.status(404).json({
            message: "Assignment not found",
        });
        return;
    }

    const student = await Student.findByPk(userEmail);

    if (!student) {
        res.status(404).json({
            message: "Student not found",
        });
        return;
    }

    await assignment.addStudent(student);

    res.status(200).json({
        message: "Assignment marked as completed",
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
    getAssignmentById,
    updateAssignment,
    markAssignmentAsCompleted,
};
