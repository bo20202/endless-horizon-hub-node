const express = require('express')
const path = require("path")
const router = express.Router();
const BanApi = require("../controllers/ban")
const passport = require(path.resolve("src/lib/passport/"))
const perms = require(path.resolve('src/lib/permissions/')).permissions
const guard = require("express-jwt-permissions")()

/* bans section */
router.get('/', BanApi.getBans)
router.get('/:id', BanApi.getBan)
router.patch('/:id', passport.authenticate('jwt', {session: false}), guard.check(perms.bans.update), BanApi.editBan)
router.post('/', passport.authenticate('jwt', {session: false}), guard.check(perms.bans.create), BanApi.addBan)

module.exports = router