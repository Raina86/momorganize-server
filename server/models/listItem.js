"use strict";
module.exports=(sequelize, DataTypes)=> {
  return sequelize.define("listItem", {
    text: DataTypes.STRING,
     user_id: DataTypes.INTEGER,
     isCompleted:DataTypes.BOOLEAN,
  });
};

















// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");

//   const TaskItemModel= sequelize.define("taskitem",{
     
//         userId: {
//         allowNull: false,
//         type: DataTypes.INTEGER,
//       },
//       text: {
//         type:DataTypes.TEXT,
//       },
      
//       isCompleted: {
//         type:DataTypes.BOOLEAN,
//       },
     
//     });
  
  
  



// module.exports = TaskItemModel;