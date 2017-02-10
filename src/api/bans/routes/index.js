const express = require('express')
const router = express.Router();
const BanApi = require("../controllers/ban")


/* bans section */
router.get('/', BanApi.getBans)
router.get('/:id', BanApi.getBan)
router.patch('/:id', BanApi.editBan)
router.post('/', BanApi.addBan)

module.exports = router