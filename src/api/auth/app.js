const express = require("express")
const app = express()
const passport = require("./config/passport.config")
const bodyParser = require("body-parser")
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.json({message: "Express is up!"});
});

module.exports = app