const BattleEvent = require("./battleEvent.model");
const Cart = require("./cart.model");

BattleEvent.hasOne(Cart);
Cart.hasMany(BattleEvent);

module.exports = { BattleEvent, Cart };
