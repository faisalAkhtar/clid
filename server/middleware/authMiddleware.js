const jwt = require('jsonwebtoken')

const db = require('../db')

const JWT_SECRET = process.env.JWT_SECRET || 'janglee'
const JWT_ALGO = 'HS256'

const signJwt = (payload, options = {}) => {
    return jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGO, ...options })
}

const verifyJwt = (token) => {
    return jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGO] })
}

const authRequired = (req, res, next) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing authorization token' })
    }

    const token = header.slice(7)
    let decoded
    try {
        decoded = verifyJwt(token)
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' })
    }

    const jti = decoded.jti
    if (jti) {
        const row = db.prepare('SELECT jti, expires_at FROM revoked_tokens WHERE jti = ?').get(jti)
        if (row) {
            return res.status(401).json({ error: 'Token revoked' })
        }
    }

    req.user = {
        id: decoded.sub,
        username: decoded.username
    }
    next()
}

module.exports = {
    signJwt,
    verifyJwt,
    authRequired
}
