require("dotenv").config();
const express = require("express");
const app = express();
const user = require("./controllers/userController");
const sequelize = require("./db");

sequelize.sync();

app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/user", user);
app.use(require("./middleware/validate-session"));


app.listen(process.env.PORT, () => {
  console.log(`great,listening on port ${process.env.PORT}`);
});

