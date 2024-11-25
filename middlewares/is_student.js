const isStudent = (req, res, next) => {
	if (req.user.role !== "student") {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}
	next();
};

module.exports = isStudent;
