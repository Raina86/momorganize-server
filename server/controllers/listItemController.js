const sequelize = require("../db");
const  ListItemModel = sequelize.import("../models/listItem");
const express  = require("express");


const listItemController = express.Router();

// /**************************
//  * CREATE  ITEM
//  **************************

listItemController.post("/additem", async (req, res) => {
  ListItemModel.create({
    text: req.body.user.text,
    user_id: req.body.user.id,
  }).then((data) => {
     res
      .status(201)
      .json({
        message: "Success: Item created!",
        token: token,
      })
      
  }).catch((err) => 
  res.status(500).json({
    message: `Error Item is not added: ${err}`,
  }));
});

// Update Item
listItemController.put("/update/:id", async (req, res) => {
  text: req.body.user.text;
  user_id: req.body.user.id;
  updatedItem = req.body.item;

      let updateItem = await ListItemModel.findOne({
      where: { text: text, id: user_id },
    });
    
    if (updateItem) {
      updateItem.update({ text: updatedText });
      res.status(200).json({ message: "Item successfully updated" });
    } else {
      res
        .status(404)
        .json({ message: "Item not found or update unsuccessful." });
    }
  } 
  


/**************** *
* Delete Item
********************/

listItemController.delete("/deletelist/:id", async (req, res) => {
  try {
    const removedList = await listItemModel.destroy({
      where: { id: req.params.id },
    }).then((data) => {
      res.status(200).json({ message: "Item succesfully deleted!" });
    });
  } catch (err) {
    res.status(500).json({
      message: `failed to delete item.`,
    });
  }


  
  module.exports = listItemController;
  