const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");
const Task= require('./task')
const Todo = sequelize.define('todo', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    priority:{
        type:Sequelize.INTEGER
    },
    description:{
        type:Sequelize.TEXT
    },
    duedate:{
        type:Sequelize.DATE
    }

},{
    // don't add the timestam attributes(updateAt,CreateAt)
    timestamps:false,
});

Todo.hasMany(Task,{ foreignKey:'todoid', sourceKey:'id'});
Task.belongsTo(Todo,{ foreignKey:'todoid', targetKey:'id'});

module.exports=Todo;