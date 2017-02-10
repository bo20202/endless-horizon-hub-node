const express = require('express')
const router = express.Router();
const AdminApi = require("../controllers/admin")

/* admins section */
router.get('/', AdminApi.getAdmins)
router.get('/:id', AdminApi.showAdmin)
router.delete('/:id', AdminApi.removeAdmin)
router.patch('/:id', AdminApi.editAdminRights)

module.exports = router