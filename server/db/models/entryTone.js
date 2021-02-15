const Sequelize = require("sequelize");
const db = require("../db");

const EntryTone = db.define("entryTone", {
  message: {
    type: Sequelize.TEXT,
  },
  anger: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  fear: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  joy: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  sadness: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  analytical: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  confident: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  tentative: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});
module.exports = EntryTone;
