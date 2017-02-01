const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || 'development'
const config = require("../config/db_config")

let sequelize = new Sequelize(config.database, config.username, config.password, {
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

let db = {}

fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
    if("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db