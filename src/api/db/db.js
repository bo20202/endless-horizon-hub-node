const Sequelize = require('sequelize')
const config = require('./db_config')


let db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    define: {
        timestamps: false,
        underscored: true
    },
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    hooks:{
        beforeDefine(attributes, options){
            Object.keys(attributes).forEach((attr) => {
                if(attributes[attr].allowNull != true){
                    attributes[attr].allowNull = false
                }
            })
        }
    }
})

module.exports = db