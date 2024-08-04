const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize(
  "postgres://postgres:ashim50@localhost:5432/flamingfork",
  {
    dialect: "postgres",
  }
);

const Order = sequelize.define();

module.exports = Order;