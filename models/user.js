const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        role: {
            type: DataTypes.ENUM(Object.values(UserRoles))
        }
	},
	{
		tableName: "users",
		timestamps: false,
		underscored: true,
	}
);

module.exports = User;
