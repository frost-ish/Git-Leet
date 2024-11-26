const { User } = require("../models");
const UserService = require("../services/user");

const registerUser = async (req, res) => {
	const { email, password, name, role } = req.body;

	if (!email || !password || !name || !role || password.len < 2 || password.len > 24
	) {
		res.status(400).json({
			message: "ERROR",
		});
		return;
	}
	try{
		createdUser = await UserService.registerUser(email, password, name, role);
	}
	catch (error){
		res.status(400).json({ message: error});
		return;
	}

	res.status(201).json({ message: "User Created Successfully" });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try{
		const {jwt, role, id} = await UserService.loginUser(email, password);
		res.status(200).json({
			token: jwt,
			role: role,
			id: id,
		});
		return;
	}
	catch (error){
		res.status(400).json({ message: error});
		return;
	}
};

const sayHello = async (req, res) => {
	res.status(200).json({
		message: `Hello ${req.user.name}`,
	});
	return;
};

module.exports = { registerUser, loginUser, sayHello };
