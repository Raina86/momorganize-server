const sequelize = require("../db");
const  TaskModel = require("../models/task");
const express  = require("express");


const taskController = express.Router();

taskController.post('/', async (req,res) =>{
  try {
      let { todoid, name, isfinished } = req.body;
      let newTask = await Task.create({
          todoid,
          name,
          isfinished
      }, {
            fields: ["todoid", "name", "isfinished"]

      });
  } catch(error) {
      res.json({
          result:'failed',
          data:{},
          message:`Insert a new Task failed. Error: ${error}`
  });
}
});
// Update
taskController.put('/:id', async (req, res) =>{
  let{id} = req.params;
  let { todoid, name, isfinished } = req.body;
  try {
      let tasks = await Task.findAll({
          attributes: ["id", "todoid", "name", "isfinished"],
          where:{
              id
          }
      });
      if(tasks.length > 0) {
          tasks.forEach(async (task) => {
              await task.update({
                  todoid: todoid? todoid: task.todoid,
                  name: name ? name: task.name,
                  isfinished: isfinished? isfinished: task.isfinished,
                  

              });
          });
          res.json({
              result:'OK',
              data:tasks,
              message:"update a Task successfully"
          });
      } else{
          res.json({
              result:'failed',
              data:{},
              message:"Cannot find Task to update"
          });

      }
  } catch(error) {
       res.json({
          result:'failed',
          data:{},
          message:`Cannot update a Task. Error:${error}`
       });
  }
  
});
// Delete 

taskController.delete('./:id', async(req,res) =>{
  let {id} = req.params;
  try{
      
      let numberOfDeleteRows = await Task.destroy({
          where:{
              id
          }
      });
      res.json({
          result:'OK',
          message:"Delete a Task successfuly",
          count:numberOfDeleteRows
      })
  } catch (error){
      res.json({
          result:'failed',
          data:{},
          message:`Delete a Task failed.Error:${error}`
      });
  }
});
//Query 
taskController.get('/', async(req,res) =>{
  try{
      const tasks = await Task.findAll({
          attributes: ['id', "todoid", "name", "isfinished"],
          order:[
              ['name', 'ASC']
          ],
      });
      res.json({
          result:'OK',
          data:tasks,
          message:"query List of Tasks successfully"
      });
  } catch (error) {
      res.json({
          result:'failed',
          data:[],
          message:`query List of Tasks failed.Error:${error}`

  });
}
});


// Get by Id?
taskController.get('/:id', async(req,res) =>{
  let {id} = req.params;
  try{
      let tasks = await Task.findAll({
          attributes: ["id", "todoid", "name", "isfinished"],
          where: {
              id: id
          },
         
      });
      if(tasks.length > 0){
      res.json({
          result:'OK',
          data:tasks [0],
          message:"query List of Tasks successfully"
      });
  } else  {
      res.json({
          result:'failed',
          data:{},
          message:"Cannot find Task to show"

  });

  }
} catch (error){
 res.json ({
     result:'failed',
     data:{},
     message:`query list of Tasks(by id failed.Error:${error})`
 });
}
});

// Query by todoid

taskController.get('/todoid:todoid', async(req,res) =>{
  let {todoid} = req.params;
  try{
      let tasks = await Task.findAll({
          attributes: ["id", "todoid", "name", "isfinished"],
          where: {
              id: todoid
          }
         
      });
       res.json({
          result:'OK',
          data:tasks,
          message:"query List of Tasks successfully"
      });

} catch (error){
 res.json ({
     result:'failed',
     data:{},
     message:`query list of Tasks(by id) failed.Error:${error})`
 });
}
});


module.exports = taskController;









// listItemController.post("/additem", async (req, res) => {
//   ListItemModel.create({
//     text: req.body.user.text,
//     user_id: req.body.user.id,
//   }).then((data) => {
//      res
//       .status(201)
//       .json({
//         message: "Success: Item created!",
//         token: token,
//       })
      
//   }).catch((err) => 
//   res.status(500).json({
//     message: `Error Item is not added: ${err}`,
//   }));
// });

// // Update Item
// listItemController.put("/update/:id", async (req, res) => {
//   text: req.body.user.text;
//   user_id: req.body.user.id;
//   updatedItem = req.body.item;

//       let updateItem = await ListItemModel.findOne({
//       where: { text: text, id: user_id },
//     });
    
//     if (updateItem) {
//       updateItem.update({ text: updatedText });
//       res.status(200).json({ message: "Item successfully updated" });
//     } else {
//       res
//         .status(404)
//         .json({ message: "Item not found or update unsuccessful." });
//     }
//   } 
  


// /**************** *
// * Delete Item
// ********************/

// listItemController.delete("/deletelist/:id", async (req, res) => {
//   try {
//     const removedList = await listItemModel.destroy({
//       where: { id: req.params.id },
//     }).then((data) => {
//       res.status(200).json({ message: "Item succesfully deleted!" });
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: `failed to delete item.`,
//     });
//   }


  
//   module.exports = listItemController;
  