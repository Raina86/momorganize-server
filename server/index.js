require("dotenv").config();
const express = require("express");
const user = require("./controllers/userController");
const listItem = require("./controllers/listItemController");
const sequelize = require("./db");

sequelize.sync();

const app = express();
app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/user", user);

app.use("/listIem", listItem);

app.listen(process.env.PORT, () => {
  console.log(`great,listening on port ${process.env.PORT}`);
});
