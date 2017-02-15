const express = require("express")
const app = express()
const passport = require("./config/passport.config")
const bodyParser = require("body-parser")
const login = require("./controllers/login")

app.use(passport.initialize());
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.json({message: "Express is up!"});
});

app.post("/login", login)

module.exports = app