const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const admins = require("./admins/routes")
const bans = require("./bans/routes")
const auth = require("./auth/app")


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/admins', admins)
app.use('/bans', bans)
app.use('/auth', auth)

module.exports = app

