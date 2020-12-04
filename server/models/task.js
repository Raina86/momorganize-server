const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Task = sequelize.define('task', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    todoid:{
        type:Sequelize.INTEGER
    },
    isfinished:{
        type:Sequelize.BOOLEAN

    }
},{
    // don't add the timestam attributes(updateAt,CreateAt)
    timestamps:false,
});

module.exports = Task;


// "use strict";
// module.exports=(sequelize, DataTypes)=> {
//   return sequelize.define("task", {
//     text: DataTypes.STRING,
//      user_id: DataTypes.INTEGER,
//      isCompleted:DataTypes.BOOLEAN,
//   });
// };













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