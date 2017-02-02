process.env.NODE_ENV = 'test'
const models = require("../src/models")
const Ban = models.ban
const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const assert = chai.assert

chai.use(chaiHttp)

describe('Bans', () => {
    beforeEach((done) => {
        
    })
})