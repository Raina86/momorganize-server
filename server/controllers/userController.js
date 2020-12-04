const sequelize = require("../db");
const UserModel  = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const userController = express.Router();

/**************************
 * Register Route
 **************************/

userController.post("/register", async (req, res) => {
  UserModel.create({
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.password, 10),
  }).then((data) => {
    const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);
    res
      .status(201)
      .json({
        message: "Success: Account created!",
        token: token,
      })
      
  }).catch((err) => 
  res.status(500).json({
    message: `Error Logging In: ${err}`,
  }));
});

/************************
 * Login Route
 ************************/

userController.post("/login", async (req, res) => {
  console.log(req)
  // try {
    let loginUser = await UserModel.findOne({
      where: {username: req.body.user.username },
    });
    console.log(loginUser)
    if (loginUser && (await bcrypt.compare(req.body.user.password, loginUser.passwordhash))) {
      const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET);
      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Login Failed",
      });
    }
  } //catch (err) {
//     res.status(500).json({
//       message: `Error Logging In: ${err}`,
//     });
  // }
);

/* ******************
 * Delete User Route
 ********************/

userController.delete("/deleteuser", async (req, res) => {
  console.log(req.user.id)
  try {
    const removedUser = await UserModel.destroy({
      where: { id: req.user.id },
    }).then((data) => {
      res.status(200).json({ message: "User succesfully deleted!" });
    });
  } catch (err) {
    res.status(500).json({
      message: `failed to delete user. ${err}`,
    });
  }
});

module.exports = userController;
