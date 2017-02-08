const express = require('express')
const router = express.Router();
const AdminApi = require("../controllers/admin")
const BanApi = require("../controllers/ban")


/* admins section */
router.get('/admins', AdminApi.getAdmins)
router.get('/admins/:id', AdminApi.showAdmin)
router.delete('/admins/:id', AdminApi.removeAdmin)
router.patch('/admins/:id', AdminApi.editAdminRights)


/* bans section */
router.get('/bans/', BanApi.getBans)
router.get('/bans/:id', BanApi.getBan)
router.patch('/bans/:id', BanApi.editBan)
router.post('/bans/', BanApi.addBan)

module.exports = router