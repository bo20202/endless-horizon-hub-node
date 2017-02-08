process.env.NODE_ENV = 'test'
const models = require("../src/api/models")
const Player = models.player
const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const factory = require("./fixtures")
const assert = chai.assert

chai.use(chaiHttp)

describe('Players', () => {
    beforeEach((done) =>{
        models.sequelize.sync({force: true})
        .then(() => {
            this.admin = factory.create('Player', {rank: 'admin', flags: 111})
            this.notAdmin = factory.create('Player', {rank: 'player', flags: 0})
            return Promise.all([Player.create(this.admin), Player.create(this.notAdmin)])
        })
        .then(() => done())
        .catch(error => done(error))
    })

    describe('/GET admins', () => {
       it('should get all admins (not players!)', (done) => {
            chai.request(app).get('/api/admins')
            .then(res => {
               assert.equal(res.status, 200)
               assert.isArray(res.body.admins)
               assert.equal(res.body.admins.length, 1)
               assert.equal(res.body.status, 'OK')
               assert.equal(res.body.admins[0].rank, this.admin.rank)
               assert.equal(res.body.admins[0].flags, this.admin.flags)
               done()
           })
            .catch((err) => {
               done(err)
            })
        })
        
        it('should not get sensitive fields (cid, ip)', (done) =>{
            chai.request(app).get('/api/admins')
            .then(res => {
                assert.equal(res.status, 200)
                assert.equal(res.body.admins.length, 1)
                assert.notProperty(res.body.admins[0], 'ip')
                assert.notProperty(res.body.admins[0], 'cid')
                done()
            })
            .catch((err)=>{
                done(err)
            })
        })
    })
    
    
    describe('DELETE /admins/:id', () => {
        it('should set rank and flags to default', (done) => {
            chai.request(app).delete('/api/admins/1')
            .then((res) => {
                assert.equal(res.body.status, 'OK')
                return Player.findById(1)
            })
            .then((player) => {
                assert.equal(player.rank, 'player')
                assert.equal(player.flags, 0)
                done()
            })
            .catch((err) => done(err))
        })
            
        it('should return an error if id is not presented', (done) => {
            chai.request(app).delete('/api/admins/10').end((err, res) => {
                assert(res.status === 400)
                assert.equal(res.body.error, 'Data not found!')
                done()
            })
        })
    })
    
    describe('GET /admins/:id', () => {
        it('should return an error and 404 code if admin is not presented', done => {
            chai.request(app).get('/api/admins/10')
            .end((err, res) => {
                assert.equal(res.status, 404)
                assert.equal(res.body.error, "Data not found!")
                done()
            })
        })
    })
    
    describe('PATCH /admins/:id', () => {
        it('should set admin rank and flags to specified', (done) => {
            let id = 1
            let rank = 'changed rank'
            let flags = 1337
            chai.request(app).patch('/api/admins/' + id).send({rank, flags})
            .then(res => {
                assert.equal(res.body.status, 'OK')
                assert.equal(res.body.player.rank, rank)
                assert.equal(res.body.player.flags, flags)
                return Player.findById(id)
            }).then(player => {
                assert.equal(player.rank, rank)
                assert.equal(player.flags, flags)
                done()
            })
            .catch(err => done(err))
        })
    })
})