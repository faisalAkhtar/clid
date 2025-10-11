const jwt = require('jsonwebtoken')

const db = require('../db')

const JWT_SECRET = process.env.JWT_SECRET || 'janglee'
const JWT_ALGO = 'HS256'

const signJwt = (payload, options = {}) => {
    return jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGO, ...options })
}

module.exports = {
    signJwt
}
