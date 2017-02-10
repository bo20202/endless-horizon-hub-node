const passport = require("passport")
const passportJwt = require("passport-jwt")
const models = require("../../models")
const config = require("./jwt.config")
const ExtractJwt = passportJwt.ExtractJwt
const Strategy = passportJwt.Strategy
const User = models.user
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
}

let strategy = new Strategy(params, (payload, done) => {
    console.log("payload received", payload)
    User.findById(payload.id)
            .then(user => {
                if(user){
                    done(null, {
                        id: user.id
                    })
                }
                else{
                    done(new Error("User not found!"), null)
                }
            })
})

passport.use(strategy)
module.exports = passport