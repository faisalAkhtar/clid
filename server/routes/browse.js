const express = require('express')
const router = express.Router()

const { authRequired } = require('../middleware/authMiddleware')
const { validateSwipe } = require('../middleware/browseMiddleware')
const { listProfiles, listMatches, swipeProfile } = require('../models/browseModel')

router.get('/', authRequired, (req, res) => {
    let limit = 1, offset = 0
    if (req.body) {
        limit = parseInt(req.body.limit || '1')
        offset = parseInt(req.body.offset || '0')
    }

    if (limit == 0) {
        return res.status(400).send('Limit required')
    }

    if (limit < 0 || offset < 0) {
        return res.status(400).send('Limit and offset must be non-negative')
    }

    let profiles = listProfiles(limit, offset, req.user.id)

    res.json({ profiles })
})

router.get('/matches', authRequired, (req, res) => {
    let profiles = listMatches(req.user.id)

    console.log({ profiles })
    res.json({ profiles })
})

router.post('/swipe', authRequired, validateSwipe, (req, res) => {
    const userId = req.user.id
    const info = req.swipeInfo

    if (info.alreadySwiped) {
        return res.json({ alreadySwiped: true, match: false })
    }

    const result = swipeProfile(userId, info.target_id, info.type, info.reverseLike)
    res.json(result)
})

module.exports = router
