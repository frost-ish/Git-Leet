const jwt = require('jsonwebtoken');

const userExists = async (req, res, next) => {
  let token;

  try {
    token = req.headers.authorization?.substring(7);

    if (!token) {
      throw new Error("No token provided");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    res.status(401).json({
      message: err.message || "No JWT token provided",
    });
  }
};

module.exports = userExists;
