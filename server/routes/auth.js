const express = require('express')
const router = express.Router()
const { v4:uuidv4 } = require('uuid')

const { createUser, findUserByUsername } = require('../models/authModel')
const { signJwt } = require('../middleware/authMiddleware')

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

router.post('/signup', (req, res) => {
    if (req.body == undefined) return res.status(400).json({ error: 'empty body' })

    const { username, email } = req.body
    if (!username) return res.status(400).json({ error: 'username required' })

    const existing = findUserByUsername(username)
    if (existing) return res.status(409).json({ error: 'username already exists' })

    const user = createUser({ username, email })
    const jti = uuidv4()
    const token = signJwt({ sub: user.id, username: user.username }, { expiresIn: JWT_EXPIRES_IN, jwtid: jti })
    res.json({ user: { id: user.id, username: user.username, email: user.email }, token, jti })
})

module.exports = router
