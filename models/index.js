const sequelize = require("../config/database");

const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

User.hasOne(Student);

User.hasOne(Teacher);

module.exports = { User, sequelize };
