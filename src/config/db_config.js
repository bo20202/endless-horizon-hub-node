'use strict'

let config;
if(process.env.NODE_ENV == 'production'){
    config = {
    database: 'Hub',
    username: process.env.C9_USER,
    password: '',
    host: 'localhost',
    dialect: 'mysql'
    }
}
else if(process.env.NODE_ENV == 'test'){
 config = {    
    database: 'test',
    username: process.env.C9_USER,
    password: '',
    host: 'localhost',
    dialect: 'mysql'
}
}

module.exports = config