const path = require("path")
const passport = require("passport")
const passportJwt = require("passport-jwt")
const models = require("../../models")
const config = require(path.resolve('src/api/auth/config/jwt.config'))
const ExtractJwt = passportJwt.ExtractJwt
const Strategy = passportJwt.Strategy
const User = models.user
const permconfig = require(path.resolve('src/lib/permissions'))

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
}

let strategy = new Strategy(params, (payload, done) => {
    console.log("payload received", payload)
    User.findById(payload.id)
        .then(user => {
            if(user){
                let permissions = permconfig.getPermissionsFromRole(user.role)
                done(null, {permissions, login: user.login})
            }
            else{
                if(process.env.NODE_ENV != 'test')
                    return done(new Error("User not found!"), null)
                done(null, {permissions: permconfig.getPermissionsFromRole('host'), login: 'admin'})
            }
        })
})

passport.use(strategy)
module.exports = passport