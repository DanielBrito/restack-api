const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
  user: "danielbrito",
  password: process.env.PG_PASSWORD,
  database: "restack",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
