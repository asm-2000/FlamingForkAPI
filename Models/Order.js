const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize(
  "postgres://postgres:ashim50@localhost:5432/flamingfork",
  {
    dialect: "postgres",
  }
);

// Define customerorder schema structure

const CustomerOrder = sequelize.define(
  "customerorder",
  {
    orderid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderstatus: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = CustomerOrder;
