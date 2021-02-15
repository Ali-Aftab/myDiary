const { User } = require("./models/user");

const Sequelize = require("sequelize");
const db = require("./db");

//Write your relations here!

module.exports = { db, User };
