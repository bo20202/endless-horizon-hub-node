const models = require("../models")
const Ban = models.ban
const Player = models.player

const BanApi = {
    getBans(req, res) {
        Ban.findAll({
            attributes: {exclude: ['ip', 'cid']},
            order: [['time', 'DESC']],
            include: [{model: Player, as: 'target', attributes:['ckey']},
                      {model: Player, as: 'banned_by', attributes: ['ckey']},
                      {model: Player, as: 'unbanned_by', attributes: ['ckey']}]
        }).then((bans) => {
            res.json({status: 'OK', bans})
        }).catch((error) => res.status(400).json({errors: {title: 'Data not found!'}}))
    },
    
    getBan(req, res) {
        let id = req.params.id
        Ban.findById(id, {
            attributes: {exlude: ['ip', 'cid']},
            include: [{model: Player, as: 'target', attributes:['ckey']},
                      {model: Player, as: 'banned_by', attributes: ['ckey']},
                      {model: Player, as: 'unbanned_by', attributes: ['ckey']}]
        }).then((ban) => {
            res.json({status: 'OK', ban})
        }).catch((error) => res.status(400).json({errors: {title: 'Data not found!'}}))
    },
    
    editBan(req, res) {
        let id = req.body.id
        let reason = req.body.reason
        let unbanned = req.body.unbanned
        let expirationTime = req.body.expirationTime
        Ban.findById(id, {
            attributes: ['id', 'expirationTime', 'unbanned', 'reason'],
            include: [{model: Player, as: 'target', attributes:['ckey']},
                      {model: Player, as: 'banned_by', attributes: ['ckey']},
                      {model: Player, as: 'unbanned_by', attributes: ['ckey']}]
            
        }).then((ban) => {
            if(unbanned)
                ban.unban()
            ban.reason = reason || ban.reason
            ban.expirationTime = expirationTime || ban.expirationTime
            ban.save().then(() => {
                res.json({status: 'OK', ban})
            }).catch((error) => res.status(400).json({errors: {title: 'Error saving ban!'}}))
        }).catch((error) => res.status(400).json({errors: {title: 'Error querying!'}}))
    },
    
    addBan(req, res) {
        let ban = req.body.ban
        Ban.create(ban).then((ban) => {
            res.json({status: 'OK', ban})
        }).catch((error) => res.status(400).json({errors: {title: 'Error saving!'}}))
    } 
}

module.exports = BanApi