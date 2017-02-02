const models = require("../models")
const Ban = models.ban
const Player = models.player

const BanApi = {
    getBans(req, res) {
        Ban.findAll({
            attributes: {exclude: ['ip', 'cid']},
            order: [['time', 'DESC']]
        }).then((bans) => {
            res.json({status: 'OK', bans})
        })
    },
    
    editBan(req, res) {
        let id = req.body.id
        let reason = req.body.reason
        let unbanned = req.body.unbanned
        let expirationTime = req.body.expirationTime
        Ban.findById(id, {attributes: ['id', 'expirationTime', 'unbanned', 'reason']}).then((ban) => {
            if(unbanned)
                ban.unban()
            ban.reason = reason || ban.reason
            ban.expirationTime = expirationTime || ban.expirationTime
            ban.save().then(() => {
                res.json({status: 'OK', ban})
            }).catch((error) => res.status(400).json({errors: {title: 'Error saving ban!'}}))
        }).catch((error) => res.status(400).json({errors: {title: 'Error querying!'}}))
    }
}

module.exports = BanApi