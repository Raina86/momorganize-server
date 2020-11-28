const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserModel = sequelize.define("user", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "Email address already in use!" },
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserModel;
