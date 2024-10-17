const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Student = sequelize.define(
	{
		rollNumber: {
			type: DataTypes.STRING,
			primaryKey: true,
			validate: {
				isNumeric: true,
				len: [9, 9],
			},
		},
	},
	{
		tableName: "students",
		timestamps: false,
		underscored: true,
	}
);
