const crypto = require("node:crypto");

const genHash = (password, salt) => {
	password += salt;
	const hashedPassword = crypto
		.createHash("sha256")
		.update(password)
		.digest("base64");

	return hashedPassword;
};

const genSalt = () => {
	return crypto.randomBytes(20).toString('hex');
};

module.exports = { genSalt, genHash };
