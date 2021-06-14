const Sequelize = require("sequelize");
const db = require("../config/db");

const user = db.define("user", {
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

user.sync({});

module.exports = user;
