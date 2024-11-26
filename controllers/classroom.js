const { Classroom, User, Student } = require("../models");

const createClassroom = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({
            message: "ERROR",
        });
        return;
    }
    const created_classroom = await Classroom.create({ name });
    res.status(201).json({
        message: "Classroom Created Successfully",
        classroom: created_classroom,
    });
};

const getClassrooms = async (req, res) => {
    const classrooms = await Classroom.findAll();

    res.status(200).json({
        classrooms,
    });
};
const getClassroomById = async (req, res) => {
    const { id } = req.params;
    try {
        const classroom = await Classroom.findByPk(id);

        res.status(200).json({
            classroom,
        });
    } catch (error) {
        res.status(400).json({ message: error });
        return;
    }
};

const getStudentsForClassroom = async (req, res) => {
    const { id } = req.params;

    const classroom = await Classroom.findByPk(id, {
        include: "students",
    });

    res.status(200).json({
        classroom,
    });
};

const joinClassroom = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(req.user.email);
    const student = await user.getStudent();

    const classroom = await Classroom.findByPk(id);
    await classroom.addStudent(student);

    res.status(200).json({
        message: "Student added to classroom",
    });
};

const getClassroomsForStudent = async (req, res) => {
    const user = await User.findByPk(req.user.email);
    const student = await user.getStudent();
    var classrooms;
    try {
        classrooms = await student.getClassrooms();
    } catch (error) {
        res.status(400).json({ message: error });
        return;
    }
    // TODO: Verify names of the attributes
    for (const classroom of classrooms) {
        // Get total number of assignments for the classroom
        const assignments = await classroom.getAssignments();
        classroom.dataValues.totalAssignments = assignments.length;

        // Get total number of completed assignments for the classroom
        const completedAssignments = await student.getAssignments({
            where: {
                classroomId: classroom.id,
            },
        });
        classroom.dataValues.totalCompletedAssignments =
            completedAssignments.length;
    }
    res.status(200).json({
        classrooms,
    });
};

module.exports = {
    createClassroom,
    getClassrooms,
    joinClassroom,
    getStudentsForClassroom,
    getClassroomsForStudent,
    getClassroomById,
};
