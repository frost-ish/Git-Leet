const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Teacher = sequelize.define(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
	},
	{
		tableName: "teachers",
		timestamps: false,
		underscored: true,
	}
);

module.exports = Teacher;
