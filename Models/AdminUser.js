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

// Define adminUser schema structure

const AdminUser = sequelize.define("AdminUser", {
  adminId: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Middleware for hashing password before registering customer info

AdminUser.beforeCreate(async (adminUser) => {
  adminUser.password = await bcrypt.hash(adminUser.password, 10);
});

module.exports = { sequelize, AdminUser };
