const isTeacher = (req, res, next) => {
    if (req.user.role !== "teacher") {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }
    next();
}

module.exports = isTeacher;