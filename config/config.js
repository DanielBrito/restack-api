require("dotenv").config();

module.exports = {
  development: {
    username: process.env.ADMIN,
    password: process.env.PG_PASSWORD,
    database: process.env.PROJECT_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
