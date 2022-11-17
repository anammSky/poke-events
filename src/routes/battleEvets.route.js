const { Router } = require("express");
const battleEventsRouter = Router();
const { BattleEvent, Cart } = require("../models");

// route: /api/battles

// battleEventsRouter.get("/", (req, res) => {
//   res.status(200).send("Route success");
// });

battleEventsRouter.get("/info", async (req, res) => {
  const allBattleEvents = await BattleEvent.findAll();
  res.status(200).send({ events: allBattleEvents });
});

battleEventsRouter.get("/:id", async (req, res) => {
  const event = await BattleEvent.findByPk(req.params.id);
  res.status(200).send(event);
});

battleEventsRouter.post("/add/event", async (req, res) => {
  console.log("back");
  const event = await BattleEvent.findByPk(req.body.id);
  await event.createCart({ quantity: req.body.quantity });
  res.sendStatus(200);
});
module.exports = battleEventsRouter;
