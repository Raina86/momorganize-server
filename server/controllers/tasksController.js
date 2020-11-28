const sequelize = require("../db");
const { UserModel } = sequelize.import("../models/taskList");
const { Router } = require("express");


const taskListController = Router();


/***********************
 * CREATE LIST
 ***********************/

taskListController.post("/newTask", async (req, res) => {
    const owner = req.user.id;
    const { title } = req.body;
    try {
      let listCheck = await TaskListModel.findOne({
        where: { owner: owner, title: title }, // * one User cannot use same list title twice.
      });
      if (listCheck !== null) {
        res.status(400).json({
          message: "Name aleady exists. Try a different name.",
        });
      } else {
        let newList = TaskListModel.create({
          owner: owner,
          title: title,
        });
        res.status(201).json({
          result: newList,
          message: "List created",
        });
      }
    } catch (err) {
      {
        res.status(500).json({
          message: "Failed to create list.",
        });
      }
    }
  });
  
  
  /***********************
   * DISPLAY ALL LISTS FOR OWNER
   ***********************/
  taskListController.get("/allLists", async (req, res) => {
    const taskListOwner = req.user.id;
  
    try {
      let allLists = await TaskListModel.findAll({
        where: { owner: bookListOwner },
      }).then((data) => {
        // if list(s) returned, display the list(s); else display message
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "No lists found." });
        }
      });
    } catch (err) {
      {
        res.status(500).json({
          message: `Failed to retrieve lists.`,
        });
      }
    }
  });
  
  
  /***********************
   * DISPLAY SINGLE LIST
   ***********************/
  taskListController.get("/singleList/:id", async (req, res) => {
    const listID = req.params.id;
    const listOwner = req.user.id;
  
    try {
      let singleList = await TaskListModel.findOne({
        where: { id: listID, owner: listOwner },
      }).then((data) => {
        // if list returned, display the list; else display message
        if (data !== null) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "List not found." });
        }
      });
    } catch (err) {
      {
        res.status(500).json({
          message: `Failed to retrieve lists`,
        });
      }
    }
  });
  
  
  /***********************
   * UPDATE LIST
   ***********************/
  taskListController.put("/update/:id", async (req, res) => {
    const listID = req.params.id;
    const listOwner = req.user.id;
    const updatedTitle = req.body.title;
  
    try {
      // select a list where id = listID and owner = listowner
      let updateList = await TaskListModel.findOne({
        where: { id: listID, owner: listOwner },
      });
      //  if updatelist and updatedTitle both exist,
      //  update title to updatedTitle, and respond with status(200) and message.
      //  else respond with status(404) and message.
      if (updateList && updatedTitle) {
        updateList.update({ title: updatedTitle });
        res.status(200).json({ message: "List successfully updated" });
      } else {
        res
          .status(404)
          .json({ message: "List not found or update unsuccessful." });
      }
    } catch {
      function updateError(err) {
        res.status(500).json(`Failed to retrieve lists`);
      }
    }
  });
  
  /* *******************
   * DELETE LIST
   *********************/
  taskListController.delete("/deletelist/:id", async (req, res) => {
    try {
      const removedList = await TaskListModel.destroy({
        where: { id: req.params.id },
      }).then((data) => {
        res.status(200).json({ message: "List succesfully deleted!" });
      });
    } catch (err) {
      res.status(500).json({
        message: `failed to delete list.`,
      });
    }
  });
  
  module.exports = taskListController;
  