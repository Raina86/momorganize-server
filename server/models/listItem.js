"use strict";
module.exports = (sequelize, DataTypes) => {
  const ListItemModel = sequelize.define("listItem", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });
  return ListItemModel;
};
