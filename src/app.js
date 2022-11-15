const express = require("express");
const path = require("path");
const { battleEventsRouter } = require("./routes");
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

//set up routes for api
app.use("/api/battles", battleEventsRouter);

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});
module.exports = app;
