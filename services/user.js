const { User } = require("../models/index");
const CryptoService = require("./crypto");
const jwt = require("jsonwebtoken");

const registerUser = async (email, password, name, role, rollNumber) => {
	const user = await User.findByPk(email);
	if (user) throw "User already exists";

	// Hash Password
	const salt = CryptoService.genSalt();
	password = CryptoService.genHash(password, salt);

	const createdUser = await User.create({
		email,
		password,
		name,
		salt,
		role,
	});

	if (role == "teacher") {
		await createdUser.createTeacher({
			id: Math.floor(Math.random() * 9000) + 1000,
		});
	} else {
		await createdUser.createStudent({ rollNumber: rollNumber });
	}

	return createdUser;
};

const loginUser = async (email, password) => {
	const user = await User.findByPk(email);
	if (!user) throw "User does not exist";

	var roll_number = "";
	if (user.role == "student") {
		const student = await user.getStudent();
		roll_number = student.rollNumber;
	}
	const salt = user.salt;
	const hashedPassword = CryptoService.genHash(password, salt);
	if (user.password != hashedPassword) throw "Incorrect Password";

	const token = jwt.sign(
		{ email: user.email, role: user.role, name: user.name, rollNumber: roll_number },
		process.env.JWT_SECRET,
		{
			expiresIn: "10h",
		}
	);

	return { jwt: token, role: user.role, id: email };
};

module.exports = { registerUser, loginUser };
