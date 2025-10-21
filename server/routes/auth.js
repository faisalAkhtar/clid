const express = require('express')
const router = express.Router()
const { v4:uuidv4 } = require('uuid')

const { createUser, findUserByUsername, revokeToken } = require('../models/authModel')
const { signJwt } = require('../middleware/authMiddleware')
const { createProfile } = require('../models/profileModel')

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

router.post('/signup', (req, res) => {
    if (req.body == undefined) return res.status(400).json({ error: 'empty body' })

    var { username, email } = req.body
    if (!username) return res.status(400).json({ error: 'username required' })
    username = username.toLowerCase()
    email = username.toLowerCase()

    const existing = findUserByUsername(username)
    if (existing) return res.status(409).json({ error: 'username already exists' })

    const user = createUser({ username, email })
    createProfile(user.id)
    const jti = uuidv4()
    const token = signJwt({ sub: user.id, username: user.username }, { expiresIn: JWT_EXPIRES_IN, jwtid: jti })
    res.json({ user: { id: user.id, username: user.username, email: user.email }, token, jti })
})

router.post('/signin', (req, res) => {
    if (req.body == undefined) return res.status(400).json({ error: 'empty body' })

    var { username } = req.body
    if (!username) return res.status(400).json({ error: 'username required' })
    username = username.toLowerCase()

    const user = findUserByUsername(username)
    if (!user) return res.status(404).json({ error: 'user not found' })

    const jti = uuidv4()
    const token = signJwt({ sub: user.id, username: user.username }, { expiresIn: JWT_EXPIRES_IN, jwtid: jti })
    res.json({ user: { id: user.id, username: user.username, email: user.email }, token, jti })
})

router.post('/signout', (req, res) => {
    if (req.body == undefined) return res.status(400).json({ error: 'empty body' })

    const { jti } = req.body
    const authHeader = req.headers.authorization

    if (!jti && !authHeader) {
        return res.status(400).json({ error: 'provide jti in body or send Authorization header' })
    }

    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET || 'janglee'
    let decoded
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7)
        try {
            decoded = jwt.decode(token, { complete: true })
        } catch (err) {
            decoded = null
        }
    }

    const jtiToRevoke = jti || (decoded && decoded.payload && decoded.payload.jti)
    const exp = decoded && decoded.payload && decoded.payload.exp ? decoded.payload.exp * 1000 : (Date.now() + 7 * 24 * 3600 * 1000)

    if (!jtiToRevoke) {
        return res.status(400).json({ error: 'could not determine jti to revoke' })
    }

    revokeToken(jtiToRevoke, exp)
    res.json({ ok: true })
})

module.exports = router
