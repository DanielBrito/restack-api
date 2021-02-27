const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const models = require("./models");

const authRoutes = require("./routes/AuthRoutes");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(authRoutes);

models.sequelize
  .authenticate()
  .then(function () {
    console.log("Sequelize connected");
  })
  .catch(function (error) {
    console.log("Error creating connection: ", error);
  });

app.listen(3333, () => console.log("Server is running"));
