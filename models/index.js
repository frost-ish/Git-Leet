const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

User.hasOne(Student, { foreignKey: "id" });
Student.belongsTo(User, { foreignKey: "id" });

User.hasOne(Teacher, { foreignKey: "id" });
Teacher.belongsTo(User, { foreignKey: "id" });

module.exports = { User };
