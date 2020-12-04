const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
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

module.exports = User;

// "use strict";
// module.exports=(sequelize, DataTypes)=> {
//   return sequelize.define("user", {
//     username: DataTypes.STRING,
//     passwordhash: DataTypes.STRING,
//   });
// };