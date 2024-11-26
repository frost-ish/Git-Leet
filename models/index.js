const sequelize = require("../config/database");

const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Classroom = require("../models/classroom");
const Assignment = require("./assignment");

User.hasOne(Student);
User.hasOne(Teacher);
Student.belongsTo(User);
Teacher.belongsTo(User);

Teacher.hasMany(Classroom);
Classroom.belongsTo(Teacher);

Student.belongsToMany(Classroom, { through: "student_classroom" });
Classroom.belongsToMany(Student, { through: "student_classroom" });

Classroom.hasMany(Assignment);
Assignment.belongsTo(Classroom);

Assignment.belongsToMany(Student, { through: "student_assigment_completed" });
Student.belongsToMany(Assignment, { through: "student_assignment_completed" });

module.exports = {
    User,
    Teacher,
    Classroom,
    Student,
    Assignment,
    Teacher,
    sequelize,
};
