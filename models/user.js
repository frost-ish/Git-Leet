const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const { UserRoles } = require("../utils/enums");

const User = sequelize.define(
	"user",
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM(Object.values(UserRoles)),
		},
	},
	{
		timestamps: true,
		underscored: true,
	}
);

module.exports = User;
