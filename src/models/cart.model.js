const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Cart = db.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Cart;
