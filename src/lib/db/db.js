const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || 'development'
const config = require(path.resolve("src/lib/db/config"))
 
module.exports = new Sequelize(config.database, config.username, config.password, {
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
