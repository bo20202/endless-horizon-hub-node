const path = require("path")
const models = require(path.resolve('src/models'))
const User = models.user

module.exports = {
    createUser(req, res) {
        let login = req.body.login
        let password = req.body.password
        //TODO: ADD CAPTCHA CHECK!!!!!!!
        User.create({login, password})
        .then(user => {
            res.json({status: 'OK', user: {id: user.id, login: user.login}})
        })
        .catch(error => {res.status(500).json({error})})
    },
    
    getUser(req, res) {
        let id = req.body.id
        User.findById(id, {exclude: ['password']})
        .then(user => {
            res.json({status: 'OK', user})
        })
    },
    
    updateUser(req, res) {
        let user = req.body.user
        User.update({where: {login: user.id}})
        .then(changed => {
            res.json({status: 'OK'})
        })
        .catch(error => {res.status(500).json({error})})
    },
    
    deleteUser(req, res) {
        let id = req.body.id
        User.destroy({where: {id}})
        .then(res => {
            res.json({status: 'OK', message: `${res} rows affected`})
        })
        .catch(error => res.status(500).json({error}))
    }
}
