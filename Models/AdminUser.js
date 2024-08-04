const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize(
  "postgres://postgres:ashim50@localhost:5432/flamingfork",
  {
    dialect: "postgres",
  }
);

// Define adminUser schema structure

const AdminUser = sequelize.define(
  "adminuser",
  {
    adminid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
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

AdminUser.beforeCreate(async (adminUser) => {
  adminUser.password = await bcrypt.hash(adminUser.password, 10);
});

module.exports = AdminUser;
