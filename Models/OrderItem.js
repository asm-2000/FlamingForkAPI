const { Sequelize, DataTypes } = require("sequelize");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize(
  "postgres://postgres:ashim50@localhost:5432/flamingfork",
  {
    dialect: "postgres",
  }
);

// Define customerorder schema structure

const OrderItem = sequelize.define(
  "orderitem",
  {
    orderitemid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderitemname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderitemprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = OrderItem;
