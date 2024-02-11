const { DataTypes } = require("sequelize");

const sequelize = require("../config");

const Product = sequelize.define(
  "product",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    category_name: {
      type: DataTypes.STRING,
    },
    brand_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    model: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Product;
