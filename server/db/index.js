const Sequelize = require("sequelize");
const db = require("./db");

const { User } = require("./models/user");
const EntryTone = require("./models/entryTone");
const SentenceTone = require("./models/sentenceTone");

//Write your relations here!
User.hasMany(EntryTone);
EntryTone.belongsTo(User);

EntryTone.hasMany(SentenceTone);
SentenceTone.belongsTo(EntryTone);

module.exports = { db, User };
