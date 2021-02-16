const Sequelize = require("sequelize");
const db = require("./db");

const { User } = require("./models/user");
const EntryTone = require("./models/entryTone");
const SentenceTone = require("./models/sentenceTone");

//Write your relations here!
User.hasMany(EntryTone);
EntryTone.belongsTo(User);

EntryTone.hasMany(SentenceTone);
User.hasMany(SentenceTone);

SentenceTone.belongsTo(EntryTone);
SentenceTone.belongsTo(User);

module.exports = { db, User, EntryTone, SentenceTone };
