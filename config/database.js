const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
	dialect: "mysql",
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
});

module.exports = sequelize;
