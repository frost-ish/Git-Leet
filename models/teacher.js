const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Teacher = sequelize.define(
	"teacher",
	{
		userEmail: {
			type: DataTypes.STRING,
			primaryKey: true,
			references: {
				model: User,
				key: "email",
			},
		},
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
		},
	},
	{
		tableName: "teachers",
		timestamps: false,
		underscored: true,
	}
);

module.exports = Teacher;
