const { Sequelize, DataTypes } = require("sequelize");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize(
  "postgres://postgres:ashim50@localhost:5432/flamingfork",
  {
    dialect: "postgres",
  }
);

// Define customerorder schema structure

const CartItem = sequelize.define(
  "cartitem",
  {
    cartitemid: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cartitemname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cartitemimageurl:
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    cartitemprice: {
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

module.exports = CartItem;
