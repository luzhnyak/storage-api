const { DataTypes } = require("sequelize");

const sequelize = require("../config");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    contragent_id: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.STRING,
    },
    suma: {
      type: DataTypes.FLOAT,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Order;
