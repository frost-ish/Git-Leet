const { User } = require("../models/index");
const CryptoService = require("./crypto");
const jwt = require("jsonwebtoken");

const registerUser = async (email, password, name, role) => {
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

	return createdUser;
};

const loginUser = async (email, password) => {
	const user = await User.findByPk(email);
	if (!user) throw "User does not exist";

	const salt = user.salt;
	const hashedPassword = CryptoService.genHash(password, salt);
	if (user.password != hashedPassword) throw "Incorrect Password";

	const token = jwt.sign(
		{ email: user.email, role: user.role, name: user.name },
		process.env.JWT_SECRET,
		{
			expiresIn: "10h",
		}
	);
	
	return {jwt: token, role: user.role, id: email};
};

module.exports = { registerUser, loginUser };
