const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Student = sequelize.define(
	"student",
	{
		userEmail: {
			type: DataTypes.STRING,
			primaryKey: true,
			references: {
				model: User,
				key: "email",
			},
		},
		rollNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "students",
		timestamps: false,
		underscored: true,
		indexes: [
			{
				unique: true,
				fields: ["roll_number"],
			},
		],
	}
);

module.exports = Student;
