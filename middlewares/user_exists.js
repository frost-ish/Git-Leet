const jwt = require("jsonwebtoken");

const userExists = async (req, res, next) => {
	const token = req.headers.authorization.substring(7);

	if (!token) throw "No token provided";

	const payload = jwt.verify(token, process.env.JWT_SECRET);
	req.user = payload;
	next();
};

module.exports = userExists;
