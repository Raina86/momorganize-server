// const sequelize = require("../db");
// const { UserModel } = sequelize.import("../models/taskItem");
// const { Router } = require("express");


// const taskItemController = Router();

// /**************************
//  * CREATE TASK  ITEM
//  **************************/

// taskItemController.post("/addTask", async (req, res) => {
//     const owner = req.user.id; 
//     const {
    id, 
    text,
    TaskId,
    isCompleted,    
    } = req.body.task; 
    try {
      const taskList = await TaskListModel.findOne({
        //find the list to be associated with task
        where: {
          title: listTitle,
          owner: owner,
        },
      });
      if (taskList === null) {
        //No such list? Throw error.
        res.status(404).json({
          message: "No list found",
        });
      } else {
        let newTask = await TaskItemModel.create({
          //create task tied to list id
          listID: bookList.id,
          ownerID: owner,
          title,
          description,
          
        });
        res.status(200).json({
          result: newTask,
          message: "Task added to list.",
        });
      }
    } catch (err) {
      res.status(500).json({
        result: err,
        message: `Task failed to be added to list.`,
      });
    }
  });
  
  /****************************
   * UPDATE TASK ITEM (two values available to update, listID and read.)
   ****************************/
  
  taskItemController.route("/update/:id").put(async (req, res) => {
    const listOwner = req.user.id;
    const taskID = req.params.id;
    const { newListTitle, read } = req.body;
    try {
      if (newListTitle) {
        await TaskListModel.findOne({
          where: { title: newListTitle, owner: listOwner },
        }).then((data) => {
          TaskItemModel.update(
            { listID: data.id, read: read },
            { returning: true, where: { id: taskID } }
          )
            .then(([rowsUpdate, [updatedTask]]) => {
              res.status(200).json({
                updatedTask,
                message: "Task list updated",
              });
            })
            .catch((err) => {
              res.status(500).json({ message: `Update failed ${err}` });
            });
        });
      } else {
        TaskItemModel.update(
          { read },
          { returning: true, where: { id: taskID } }
        ).then(([rowsUpdate, [updatedTask]]) => {
          res
            .status(200)
            .json({
              updatedTask,
              message: "task status updated",
            })
            .catch((err) => {
              res.status(500).json({ message: `Update failed: ${err}` });
            });
        });
      }
    } catch (err) {
      res.status(500).json({
        result: err,
        message: `Task failed to be updated. New list or task unfound. ${err}`,
      });
    }
  });
  
  /******************************
   * GET SINGLE Task
   ******************************/
  bookItemController.get("/singleTask/:id", async (req, res) => {
    const taskID = req.params.id;
    const ownerID = req.user.id;
    try {
      TaskItemModel.findOne({ where: { id: bookID, ownerID: ownerID } }).then(
        (data) => {
          if (data !== null) {
            res.status(200).json({
              data,
            });
          } else {
            res.status(404).json({
              message: "No task found",
            });
          }
        }
      );
    } catch (err) {
      res.status(500).json({ err, message: "Server Error" });
    }
  });
  
  /******************************
   * GET ALL TASKS FOR LIST
   ******************************/
  
  taskItemController.get("/listTasks/:id", async (req, res) => {
    //! The id is for a list, not a task!
    const listID = req.params.id;
    try {
      TaskItemModel.findAll({ where: { listID: listID } }).then((data) => {
        if (data !== null) {
          res.status(200).json({
            data,
          });
        } else {
          res.status(404).json({
            message: "Not list found",
          });
        }
      });
    } catch (err) {
      res.status(500).json({ err, message: "Server Error" });
    }
  });
  
  module.exports = taskItemController;
  