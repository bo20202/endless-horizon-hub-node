module.exports = (db) => {
    const Sequelize = require("sequelize")
    const bcrypt = require("bcrypt")
    const userSchema = 
    {
        login: {type: Sequelize.STRING, unique: true},
        password: {type: Sequelize.STRING},
        registered: {type: Sequelize.DATEONLY, allowNull: true},
        role: {type: Sequelize.STRING, defaultValue: 'user'}
    }
    
        
    function hashPass (instance) {
        if(!instance.changed('password')) return
        return bcrypt.hash(instance.password, 10)
               .then(hash => {instance.password = hash})
               .catch(err => {throw err})
    }
    
    function setRegDate(instance) {
        instance.registered = Date.now()
        instance.save()
    }
    
    let User = db.define('user', userSchema, {
        instanceMethods: {
            validatePassword(pass){
                return bcrypt.compare(pass, this.password)
            }
        }
    })
    
    User.beforeCreate(hashPass)
    User.beforeCreate(setRegDate)
    User.beforeUpdate(hashPass)
    return User
}