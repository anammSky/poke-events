const express = require("express");
const path = require("path");
const app = express();

app.use("/", express.static("public"));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../public/index.html"));
//   //   res.send("Home Page");
// });

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});
module.exports = app;
