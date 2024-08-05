const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Set up Sequelize to connect to PostgreSQL

const sequelize = new Sequelize(
  "postgres://postgres:ashim50@localhost:5432/flamingfork",
  {
    dialect: "postgres",
  }
);

const MenuItem = sequelize.define("menuitem",
  {
    itemid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    itemname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemdescription:{
        type:DataTypes.STRING,
        allowNull: true,   
    },
    itemcategory:{
        type:DataTypes.STRING,
        allowNull: false,   
    },
    itemimageurl:{
        type:DataTypes.STRING,   
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  });

module.exports = MenuItem;
