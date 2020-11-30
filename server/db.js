require("dotenv").config();
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  

  dialect: "postgres",
  host:"localhost"
});

sequelize.authenticate()
.then(()=> 
console.log ('database is connected'))  


// // This is where the database association should go

// User = sequelize.import('./models/users');
// Task = sequelize.import('./models/tasks');
// Taskitem = sequelize.import('./models/taskItem');



// User.associate = (models) =>{
//   // associations can be defined here
//   User.hasMany(models.Task,{
//     as:'tasks',
//     foreignKey:'userId',
//   });
// };


// TasksItems.associate=(models) => {
//   // define association here
//   TasksItem.belongsTo(models.Task,{
//     as:'task',
//     foreignKey:'taskId'
//   });
// };

// Tasks.associate=(models)=> {
//   // define association here
//   Task.belongsTo(models.User,{
//     as:'user',
//     foreignKey:'userId'
//   });
//   Task.hasMany(models.Taskitem,{
//     as:'taskitems',
//     foreignKey:'taskId'
//   });
// }


module.exports = sequelize;