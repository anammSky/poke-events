const path = require("path");
const { BattleEvent } = require("../models");
const db = require("./db");
const fs = require("fs").promises;

const seed = async () => {
  await db.sync({ force: true });

  //get path to JSON data
  const battleEventSeedPath = path.join(__dirname, "events.json");

  //asynchronously read the ontent in the file
  const battleEventBuffer = await fs.readFile(battleEventSeedPath);

  //convert data from buffer into a string, then parse the JSON so it converts from string => obj
  const { eventsData } = JSON.parse(String(battleEventBuffer));

  //creates an array of a promise ready to populate db with each item in the JSON file
  const battleEventPromises = eventsData.map((event) =>
    BattleEvent.create(event)
  );

  //resolves all promises and populates the db
  await Promise.all(battleEventPromises);

  console.log("Events database populated");
};

module.exports = seed;
