const express = require('express')
const router = express.Router()

const { authRequired } = require('../middleware/authMiddleware')
const { getProfileByUserId, updateProfile } = require('../models/profileModel')

router.get('/', authRequired, (req, res) => {
    const user_id = req.user.id
    const profile = getProfileByUserId(user_id)
    if (!profile) return res.status(404).json({error: 'profile not found'})
    res.json({ profile })
})

router.put('/', authRequired, (req, res) => {
    const user_id = req.user.id
    const {name, age, gender, bio} = req.body

    if (!name && !age && !gender && !bio) {
        return res.status(400).json({ error: 'at least one profile field requried' })
    }

    const profile = updateProfile(user_id, { name, age: age ? Number(age): undefined, gender, bio })
    if (!profile) {
        return res.status(404).json({error: 'cannot update profile'})
    }

    return res.json({ profile })
})

module.exports = router
