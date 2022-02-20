//jshint esversion:6
const Database = require("./database"),
  { postgresql } = new Database(),
  db = postgresql().Pool();

module.exports = db;
