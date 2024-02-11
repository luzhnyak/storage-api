const { DataTypes } = require("sequelize");

const sequelize = require("../config");

const Contragent = sequelize.define(
  "contragent",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Contragent;
