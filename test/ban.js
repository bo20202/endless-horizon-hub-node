process.env.NODE_ENV = 'test'
const models = require("../src/models")
const Ban = models.ban
const Player = models.player
const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const factory = require("./fixtures")
const assert = chai.assert


chai.use(chaiHttp)

describe('Bans', () => {
    let ban, banner, banned
    beforeEach((done) => {
        models.sequelize.sync({force: true})
        .then(() => {
            this.banner = factory.create('Player', {rank: 'admin', flags: 123, ckey: 'banner'})
            this.banned = factory.create('Player', {ckey: 'banned'})
            return Promise.all([Player.create(this.banner), Player.create(this.banned)])
        })
        .then(players => {
            banner = players[0]
            banned = players[1]
            this.banner.id = banner.id
            this.banned.id = banned.id
            this.ban = factory.create('Ban')
            return Ban.create(this.ban)
        })
        .then(ban => {
            ban.setTarget(banned)
            ban.setBannedBy(banner)
            return ban.save()
        })
        .then(banInstance => {
            this.ban.id = banInstance.id
            ban = banInstance
            done()
        })
        .catch(err => done(err))

    
    })    
    describe('GET /bans', () => {
        it('should get list with all bans, with banner ckey and banned ckey', (done) => {
            chai.request(app).get('/api/bans/')
            .then(res => {
                assert.equal(res.body.status, 'OK')
                assert.isArray(res.body.bans)
                assert.equal(res.body.bans.length, 1)
                assert.equal(res.body.bans[0].target.ckey, this.banned.ckey)
                assert.equal(res.body.bans[0].bannedBy.ckey, this.banner.ckey)
                assert.equal(res.body.bans[0].reason, this.ban.reason)
                done()
            })
            .catch(err => {done(err)})
        })
    })
    
    describe('GET /bans/:id', () => {
        it('should get ban by id', done => {
            let id = this.ban.id
            chai.request(app).get(`/api/bans/${id}`)
            .then(res => {
                assert.equal(res.body.status, 'OK')
                assert.equal(res.body.ban.reason, this.ban.reason)
                assert.equal(res.body.ban.target.ckey, this.banned.ckey)
                done()
            })
            .catch(err => done(err))
        })
        it('should return an error if id is wrong', done => {
            chai.request(app).get('/api/bans/WRONG').end((err, res) => {
                assert.equal(res.status, 400)
                assert.equal(res.body.error, "Data not found!")
                done()
            })
        })
    })
    
    describe('PATCH /bans/:id', () => {
        it('should return changed ban params', done => {
            let id = this.ban.id
            let reason = "new reason"
            chai.request(app).patch(`/api/bans/${id}`).send({reason})
            .then(res => {
                assert.equal(res.status, 200)
                assert.equal(res.body.status, 'OK')
                assert.equal(res.body.ban.reason, reason)
                done()
            })
            .catch(error => {console.log(error); done(error)})
        })
        
        it('should actually change ban params', done => {
            let id = this.ban.id
            let reason = "new reason"
            chai.request(app).patch(`/api/bans/${id}`).send({reason})
            .then(res => {
                return Ban.findById(id)
            })
            .then(ban => {
                assert.equal(ban.reason, reason)
                done()
            })
            .catch(err => done(err))
        })
        
        it('should unban if provided', done => {
            let id = this.ban.id
            let unbanned = 1
            chai.request(app).patch(`/api/bans/${id}`).send({unbanned})
            .then(res => {
                assert.equal(res.body.ban.reason, this.ban.reason)
                assert.equal(res.body.ban.unbanned, unbanned)
                assert.isNotNull(res.body.ban.unbannedTime)
                done()
            })
            .catch(err => done(err))
        })
    })
})