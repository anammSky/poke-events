const { Router } = require("express");
const battleEventsRouter = Router();
const { BattleEvent } = require("../models");

// route: /api/battles

// battleEventsRouter.get("/", (req, res) => {
//   res.status(200).send("Route success");
// });

battleEventsRouter.get("/info", async (req, res) => {
  const allBattleEvents = await BattleEvent.findAll();
  res.status(200).send({ events: allBattleEvents });
});

module.exports = battleEventsRouter;
