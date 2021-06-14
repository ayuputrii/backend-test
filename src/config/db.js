const sequelize = require("sequelize");

const db = new sequelize("auth-backend", "root", "", {
  dialect: "mysql",
});

db.sync({});

module.exports = db;
