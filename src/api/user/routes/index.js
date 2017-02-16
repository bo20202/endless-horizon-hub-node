const express = require('express')
const path = require("path")
const router = express.Router();
const UserApi = require("../controllers/user")
const passport = require(path.resolve("src/lib/passport/"))
const perms = require(path.resolve('src/lib/permissions/')).permissions
const guard = require("express-jwt-permissions")()

console.log(perms.admins.delete)

/* admins section */
router.get('/', UserApi.getUsers)
router.post('/', UserApi.createUser)
router.get('/:id', passport.authenticate('jwt', {session: false}), rigthsChecker, guard.check(perms.user.read), UserApi.getUser)
router.patch('/:id', passport.authenticate('jwt', {session: false}), rigthsChecker, guard.check(perms.user.update), UserApi.updateUser)
router.delete('/:id', passport.authenticate('jwt', {session: false}), rigthsChecker, guard.check(perms.user.update), UserApi.deleteUser)

function rigthsChecker(req, res, next) {
    if(req.user.id === req.params.id){
        req.user.permissions.push(perms.users.update).push(perms.user.read).push(perms.user.delete)
        return next()
    }
    next()
}



module.exports = router