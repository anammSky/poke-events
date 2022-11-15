const { DataTypes } = require("sequelize");
const db = require("../db/db");

const BattleEvent = db.define("BattleEvent", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  badge: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = BattleEvent;
