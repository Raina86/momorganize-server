const { DataTypes } = require("sequelize");
const sequelize = require("../db");

  const TaskItemModel= Sequelize.define("taskitem",{
     
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      TaskId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Tasks',
          key:'id'
        }

      },
      isCompleted: {
        type:Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  
  
  



module.exports = TaskItemModel;