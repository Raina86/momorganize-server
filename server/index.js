require("dotenv").config();
const express = require("express");
const user = require("./controllers/userController");
const task = require("./controllers/taskController");
const todo = require("./controllers/todoController");
const sequelize = require("./db");

sequelize.sync();

const app = express();
app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/user", user);

app.use("/task", task);

app.use("/todo", todo);

app.listen(process.env.PORT, () => {
  console.log(`great,listening on port ${process.env.PORT}`);
});
