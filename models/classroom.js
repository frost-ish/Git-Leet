const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Classroom = sequelize.define(
	"classroom",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "classrooms",
		timestamps: false,
		underscored: true,
		initialAutoIncrement: 10000,
	}
);

module.exports = Classroom;
