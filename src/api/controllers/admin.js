const models = require("../../models")
const Player = models.player

const AdminApi = {
    getAdmins(req, res){
        Player.findAll({where: {rank: {$ne: 'player'}}, attributes:['id', 'ckey', 'rank', 'flags']}).then((admins) => {
            res.json({status: 'OK', admins})
        }).catch((error) => {
            res.status(400).json({errors: {title: "Fetching error", detail: error}})
        })
    },
    
    editAdminRights(req, res){
        let id = req.params.id
        let rank = req.body.rank
        let flags = req.body.flags
        
        Player.findById(id, {attributes: ['id', 'ckey', 'rank', 'flags']})
        .then(player => {
            if(!player)
                throw "Data not found!"
            player.editAdminRights(rank, flags)
            return player.save()
        })
        .then(player => {
            res.json({status: 'OK', player})
        })
        .catch(error => {
            res.status(400).json(error)
        })
        
    },

    
    removeAdmin(req, res){
        let id = req.params.id
        Player.findById(id)
        .then(player => {
            if(!player)
                throw "Data not found!"
            player.deadmin()
            return player.save()
        })
        .then(player => {
            res.json({status: 'OK'})
        })
        .catch(error => {
            res.status(400).json({error})
        })
    },
    
    showAdmin(req, res){
        let id = req.params.id
        Player.findById(id, {attributes: ['id', 'ckey', 'rank', 'flags'], where: {rank: {$ne: 'player'}}})
        .then(player => {
            if(!player)
                throw "Data not found!"
            res.json({status: 'OK', player})
        })
        .catch(error => {
            res.status(404).json({error})
        })
    }
    
}

module.exports = AdminApi