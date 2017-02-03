const models = require("../models")
const Ban = models.ban
const Player = models.player

const BanApi = {
    getBans(req, res) {
        Ban.findAll({
            attributes: {exclude: ['ip', 'cid']},
            order: [['time', 'DESC']],
            include: [{model: Player, as: 'target', attributes:['ckey']},
                      {model: Player, as: 'bannedBy', attributes: ['ckey']},
                      {model: Player, as: 'unbannedBy', attributes: ['ckey']}]
        })
        .then((bans) => {
            res.json({status: 'OK', bans})
        }, err => {throw "Data not found!"})
        .catch((error) => res.status(400).json({error}))
    },
    
    getBan(req, res) {
        let id = req.params.id
        Ban.findById(id, {
            attributes: {exlude: ['ip', 'cid']},
            include: [{model: Player, as: 'target', attributes:['ckey']},
                      {model: Player, as: 'bannedBy', attributes: ['ckey']},
                      {model: Player, as: 'unbannedBy', attributes: ['ckey']}]
        })
        .then((ban) => {
            if(!ban)
                throw "Data not found!"
            res.json({status: 'OK', ban})
        }, err => {throw "Data not found!"})
        .catch((error) => res.status(400).json({error}))
    },
    
    editBan(req, res) {
        let id = req.params.id
        let reason = req.body.reason
        let unbanned = req.body.unbanned
        let expirationTime = req.body.expirationTime
        Ban.findById(id, {
            attributes: ['id', 'expirationTime', 'unbanned', 'reason'],
            include: [{model: Player, as: 'target', attributes:['ckey']},
                      {model: Player, as: 'bannedBy', attributes: ['ckey']},
                      {model: Player, as: 'unbannedBy', attributes: ['ckey']}]
            
        })
        .then((ban) => {
            if(!ban)
                throw "Data not found!"
            if(unbanned)
                ban.unban()
            ban.reason = reason || ban.reason
            ban.expirationTime = expirationTime || ban.expirationTime
            return ban.save()
        }, error => {throw "Querying error!"})
        .then((ban) => {
                res.json({status: 'OK', ban})
        }, error => {throw error})
        .catch((error) => res.status(400).json({error}))
    },
    
    addBan(req, res) {
        let ban = req.body.ban
        Ban.create(ban)
        .then((ban) => {
            res.json({status: 'OK', ban})
        }, error => {throw "Saving error!"})
        .catch((error) => res.status(400).json({error}))
    } 
}

module.exports = BanApi