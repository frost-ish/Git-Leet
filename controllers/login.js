const { User } = require("../models");
const { UserRoles } = require("../utils/enums");

const login = async (req, res) => {
	try {
		const user = res.locals.user;
		if (user.role === UserRoles.STUDENT) {
			const student = await user.getStudent();
			if (!student) {
				return res.status(404).json({ message: "Student not found" });
			}
			return res.status(200).json({ message: "Welcome Student!" });
		}
		if (user.role == UserRoles.TEACHER) {
			const teacher = await user.getTeacher();
			if (!teacher) {
				return res.status(404).json({ message: "Teacher not found" });
			}
			return res.status(200).json({ message: "Welcome Teacher!" });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = login;
