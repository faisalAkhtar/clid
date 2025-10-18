const express = require('express')
const router = express.Router()

const { authRequired } = require('../middleware/authMiddleware')
const { listProfiles } = require('../models/browseModel')

router.get('/', authRequired, (req, res) => {
    const limit = parseInt(req.body.limit)
    const offset = parseInt(req.body.offset || '0')

    if (limit == 0) {
        return res.status(400).send('Limit required')
    }

    if (limit < 0 || offset < 0) {
        return res.status(400).send('Limit and offset must be non-negative')
    }

    let profiles = listProfiles(limit, offset, req.user.id)

    res.json({ profiles })
})

module.exports = router
