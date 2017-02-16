const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const login = require("./controllers/login")


app.get("/", (req, res) => {
  res.json({message: "Express is up!"});
});

app.post("/login", login)

module.exports = app