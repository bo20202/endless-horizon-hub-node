module.exports = (db) => {
    const Sequelize = require("sequelize")
    const banSchema = {
        server:             {type: Sequelize.STRING},
        type:               {type: Sequelize.STRING},
        ip:                 {type: Sequelize.STRING, allowNull: true},
        cid:                {type: Sequelize.STRING, allowNull: true},
        reason:             {type: Sequelize.TEXT},
        job:                {type: Sequelize.STRING, allowNull: true},
        duration:           {type: Sequelize.INTEGER},
        time:               {type: Sequelize.DATE},
        expirationTime:     {type: Sequelize.DATE, field: 'expiration_time'},
        unbanned:           {type: Sequelize.BOOLEAN},
        unbannedTime:       {type: Sequelize.DATE, field: 'unbanned_time'},
    }
    
    let Ban = db.define('ban', banSchema, {
        classMethods: {
            associate(models){
                Ban.belongsTo(models.player, {as: 'target', foreignKey: 'target_id'})
                Ban.belongsTo(models.player, {as: 'bannedBy', foreignKey: 'banned_by_id'})
                Ban.belongsTo(models.player, {as: 'unbannedBy', foreignKey: 'unbanned_by_id'})
            }
        },
        instanceMethods: {
            unban(){
                this.unbanned = 1
                this.unbannedTime = Date.now()
                //TODO: SET UNBANNED BY
            }
        }
    })
    return Ban
}