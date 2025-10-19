const { v4:uuidv4 } = require('uuid')

const db = require('../db')
const seed_swipes = require('../../data/seed_swipes')

const createUser = ({username, email}) => {
    const id = uuidv4()
    const created_at = Date.now()
    const stmt = db.prepare('INSERT INTO users (id, username, email, created_at) VALUES (?, ?, ?, ?)')
    stmt.run(id, username, email || null, created_at)
    if (process.env.NODE_ENV === 'development') {
        seed_swipes(db, id)
    }
    return { id, username, email, created_at }
}

const findUserByUsername = (username) => {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username)
}

const revokeToken = (jti, expiresAt) => {
    const stmt = db.prepare('INSERT OR REPLACE INTO revoked_tokens (jti, expires_at) VALUES (?, ?)');
    stmt.run(jti, expiresAt);
}

module.exports = {
    createUser,
    findUserByUsername,
    revokeToken
}
