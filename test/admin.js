process.env.NODE_ENV = 'test'
const models = require("../src/models")
const Player = models.player
const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const assert = chai.assert

chai.use(chaiHttp)

describe('Players', () => {
    beforeEach((done) =>{
        models.ban.sync().then(() => {
        Player.sync({force: true}).then(() => {
            let playerNotAdminSchema = {
                ckey: "not_admin",
                registered: Date.now(),
                firstSeen: Date.now(),
                lastSeen: Date.now(),
                ip: '127.0.0.1',
                cid: '243141515',
            }
            
            let playerAdminSchema = {
                ckey: 'admin',
                registered: Date.now(),
                firstSeen: Date.now(),
                lastSeen: Date.now(),
                ip: '122.44.55',
                cid: '124124124142',
                rank: 'admin',
                flags: 132
                
            }
            let playerAdmin = Player.create(playerAdminSchema).then(() => {
                let playerNotAdmin = Player.create(playerNotAdminSchema).then(() =>{
                    done()
                }).catch((err) => done(err))
            }).catch((err) => done(err))
            
        })
    }).catch((err) => done(err))
})

    describe('/GET admins', () => {
       it('should get all admins (not players!)', (done) => {
           chai.request(app).get('/api/admins').then((res) =>{
                assert.equal(res.status, 200)
                assert.isArray(res.body)
                assert.equal(res.body.length, 1)
                assert.equal(res.body[0].rank, 'admin')
                assert.equal(res.body[0].flags, 132)
                done()
            }).catch((err) => {
               done(err)
            })
        })
        
        it('should not get sensitive fields (cid, ip)', (done) =>{
            chai.request(app).get('/api/admins').then((res) => {
                assert(res.status === 200)
                assert(res.body.length === 1)
                assert.notProperty(res.body[0], 'ip')
                assert.notProperty(res.body[0], 'cid')
                done()
            }).catch((err)=>{
                done(err)
            })
        })
    })
    
    
    describe('DELETE /admins/:id', () => {
        it('should set rank and flags to default', (done) => {
            chai.request(app).delete('/api/admins/1').then((res) => {
                assert.equal(res.body.status, 'OK')
                assert.equal(res.body.player.rank, 'player')
                assert.equal(res.body.player.flags, 0)
                Player.findById(1).then((player) => {
                    assert.equal(player.rank, 'player')
                    assert.equal(player.flags, 0)
                    done()
                }).catch((err) => done(err))
            })
        })
        it('should return an error if id is not presented', (done) => {
            chai.request(app).delete('/api/admins/10').end((err, res) => {
                assert(res.status === 400)
                assert.equal(res.body.errors.title, 'Data not found!')
                done()
            })
        })
    })
    
    describe('PATCH /admins/:id', () => {
        it('should set admin rank and flags to specified', (done) => {
            let id = 1
            let rank = 'changed rank'
            let flags = 1337
            chai.request(app).patch('/api/admins/' + id).send({rank, flags}).then((res) => {
                assert.equal(res.body.status, 'OK')
                assert.equal(res.body.player.rank, rank)
                assert.equal(res.body.player.flags, flags)
                Player.findById(id).then((player) => {
                    assert.equal(player.rank, rank)
                    assert.equal(player.flags, flags)
                    done()
                }).catch((err) => done(err))
            }).catch((err) => done(err))
        })
    })
})