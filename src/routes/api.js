const express = require('express')
const router = express.Router();
const AdminApi = require("../api/admin")
/* admins section */
router.get('/admins', AdminApi.getAdmins)
router.get('/admins/:id', AdminApi.showAdmin)
router.delete('/admins/:id', AdminApi.removeAdmin)
router.patch('/admins/:id', AdminApi.editAdminRights)
/* bans section */


module.exports = router