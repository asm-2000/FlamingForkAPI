const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize(
  "postgres://postgres:ashim50@localhost:5432/flamingfork",
  {
    dialect: "postgres",
  }
);

// Define customer schema structure

const Customer = sequelize.define(
  "customer",
  {
    customerid: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    customername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

// Middleware for hashing password before registering customer info

Customer.beforeCreate(async (customer) => {
  customer.password = await bcrypt.hash(customer.password, 10);
});

module.exports = Customer;
