const { User } = require("../models");
const UserService = require("../services/user");

const registerUser = async (req, res) => {
	const { email, password, name, role } = req.body;

	if (
		!email ||
		!password ||
		!name ||
		!role ||
		password.len < 2 ||
		password.len > 24
	) {
		res.status(400).json({
			message: "ERROR",
		});
		return;
	}

	createdUser = await UserService.registerUser(email, password, name, role);

	res.status(201).json({ message: "User Created Successfully" });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	const jwt = await UserService.loginUser(email, password);
	res.status(200).json({
		token: jwt,
	});
	return;
};

const sayHello = async (req, res) => {
	res.status(200).json({
		message: `Hello ${req.user.name}`,
	});
	return;
};

module.exports = { registerUser, loginUser, sayHello };
