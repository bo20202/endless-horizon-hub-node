process.env.NODE_ENV = 'test'
const models = require("../src/models")
const User = models.user
const chai = require("chai")
const factory = require("./fixtures")
const assert = chai.assert

describe('Users', () => {
    beforeEach(done => {
        User.sync({force: true})
        .then(user => {
            done()
        })
        .catch(err => done(err))
        
    })
    
    describe('Create new user', () => {
        it('should hash password before saving', done => {
            let userFixt = factory.create('User')
            User.create(userFixt)
            .then(user => {
                assert.notEqual(user.password, userFixt.password)
                done()
            })
            .catch(err => done(err))
        })
        it('should set registration date', done => {
            let userFixt = factory.create('User')
            User.create(userFixt)
            .then(user => {
                assert.isNotNull(user.registered)
                done()
            })
            .catch(err => done(err))
        })
    })
})