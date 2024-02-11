const { DataTypes } = require("sequelize");

const sequelize = require("../config");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Category;
