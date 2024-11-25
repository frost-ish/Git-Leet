const sequelize = require("../config/database");

const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Classroom = require("../models/classroom");
const Assignment = require("./assignment");
const Question = require("./question");

User.hasOne(Student);
User.hasOne(Teacher);
Student.belongsTo(User);
Teacher.belongsTo(User);

Teacher.hasMany(Classroom);
Classroom.belongsTo(Teacher);

Student.belongsToMany(Classroom, { through: "student_classroom" });
Classroom.belongsToMany(Student, { through: "student_classroom" });

Assignment.hasMany(Question);
Question.belongsTo(Assignment);

Classroom.hasMany(Assignment);
Assignment.belongsTo(Classroom);

Question.belongsToMany(Student, { through: "student_question_completed" });
Student.belongsToMany(Question, { through: "student_question_completed" });

module.exports = {
	User,
	Teacher,
	Classroom,
	Student,
	Assignment,
	Teacher,
	sequelize,
};
