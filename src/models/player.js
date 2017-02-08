module.exports = (db) => {
    const Sequelize = require("sequelize")
    const bcrypt = require("bcrypt")
    const playerSchema = 
    {
        ckey:       {type: Sequelize.STRING, unique: true},
        registered: {type: Sequelize.DATEONLY, allowNull: true},
        firstSeen:  {type: Sequelize.DATE, field: 'first_seen'},
        lastSeen:   {type: Sequelize.DATE, field: 'last_seen'},
        ip:         {type: Sequelize.STRING},
        cid:        {type: Sequelize.STRING},
        rank:       {type: Sequelize.STRING, defaultValue: 'player'},
        flags:      {type: Sequelize.INTEGER, defaultValue: 0},
        password:   {type: Sequelize.STRING}
    }
    
    function hashPass (instance) {
        if(!instance.changed('password')) return
        return bcrypt.hash(instance.password, 10)
               .then(hash => {instance.password = hash})
               .catch(err => {throw err})
    }
    
    let Player = db.define('player', playerSchema ,{
        instanceMethods:{
            deadmin() {
                this.flags = 0
                this.rank = 'player'
            },
            editAdminRights(rank, flags){
                this.flags = flags
                this.rank = rank
            },
            validatePassword(pass){
                return bcrypt.compare(pass, this.password)
            }
            
        },
        classMethods: {
            associate(models) {
                Player.hasMany(models.ban, {as: 'bans', foreignKey: 'target_id'})
                Player.hasMany(models.ban, {as: 'bansBy', foreignKey: 'banned_by_id'})
                Player.hasMany(models.ban, {as: 'unbansBy', foreignKey: 'unbanned_by_id'})
            }
        }
    })
    Player.beforeCreate(hashPass)
    Player.beforeUpdate(hashPass)
    
    return Player

}