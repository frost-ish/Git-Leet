const { User } = require("../models");

const userExists = async (req, res, next) => {
	try {
		if (!req.headers["authorization"]) {
			return res
				.status(400)
				.json({ message: "Authorization header is required" });
		}
		const token = req.headers["authorization"].split("Bearer ")[1];

		let decodedToken = null;
		try {
			decodedToken = await admin.auth().verifyIdToken(token);
		} catch {
			return res.status(401).json({ message: "Invalid token" });
		}
		const id = decodedToken.uid;
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.locals.user = user;
		return next();
	} catch (error) {
		next(error);
	}
};

module.exports = userExists;
