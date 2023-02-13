require("dotenv").config();
const sequealize = require("sequelize");
const conection = new sequealize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

module.exports = conection;
