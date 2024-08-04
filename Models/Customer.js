const { Sequelize, DataTypes } = require("sequelize");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: "flamingfork",
  user: "postgres",
  password: "ashim50",
  host: "localhost",
  port: 5432,
});

// Define customer schema structure

const Customer = sequelize.define("Customer", {
  customerId: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
  },
  customerName: {
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
});

// Middleware for hashing password before registering customer info

Customer.beforeCreate(async (customer) => {
  customer.password = await bcrypt.hash(customer.password, 10);
});

module.exports = { sequelize, Customer };
