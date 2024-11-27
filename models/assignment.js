const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Assignment = sequelize.define("assignment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    dueDate: {
        type: DataTypes.DATE,
    },
});

module.exports = Assignment;
