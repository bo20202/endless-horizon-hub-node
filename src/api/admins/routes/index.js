const express = require('express')
const path = require("path")
const router = express.Router();
const AdminApi = require("../controllers/admin")
const passport = require(path.resolve("src/lib/passport/"))
const perms = require(path.resolve('src/lib/permissions/')).permissions
const guard = require("express-jwt-permissions")()

console.log(perms.admins.delete)

/* admins section */
router.get('/', AdminApi.getAdmins)
router.get('/:id', AdminApi.showAdmin)
router.delete('/:id', passport.authenticate('jwt', {session: false}), guard.check(perms.admins.delete) ,AdminApi.removeAdmin)
router.patch('/:id', passport.authenticate('jwt', {session: false}), guard.check(perms.admins.update), AdminApi.editAdminRights)

module.exports = router