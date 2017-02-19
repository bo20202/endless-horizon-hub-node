const path = require("path")
const User = require(path.resolve('src/models')).user
const jwt = require("jsonwebtoken")
const config = require("../config/jwt.config")

module.exports = (req, res) => {
        if(req.body.login && req.body.password){
            let login = req.body.login
            let password = req.body.password
            let user;
            User.find({where: {login}})
            .then(instance => {
                if(instance){
                    user = instance
                    return instance.validatePassword(password)
                }
                else
                    throw "Invalid login!"
            }, error => {throw "Database error!"})
            .then(valid => {
                if(!valid)
                    throw "Invalid password!"
                let payload = {
                    id: user.id,
                    login: user.login,
                    role: user.role
                }
                let token = jwt.sign(payload, config.jwtSecret)
                res.json({status: 'OK', token})
            })
            .catch(error => {res.status(401).json({error})})
        }
        else{
            res.status(401).json({error: "Invalid credentials!"})
        }
    }