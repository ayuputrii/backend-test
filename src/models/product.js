const Sequelize = require("sequelize");
const db = require("../config/db");

const product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
});

product.sync({});

module.exports = product;
