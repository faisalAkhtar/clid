const { v4:uuidv4 } = require('uuid')

const db = require('../db')

const createUser = ({username, email}) => {
    const id = uuidv4()
    const created_at = Date.now()
    const stmt = db.prepare('INSERT INTO users (id, username, email, created_at) VALUES (?, ?, ?, ?)')
    stmt.run(id, username, email || null, created_at)
    return { id, username, email, created_at }
}

const findUserByUsername = (username) => {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username)
}

module.exports = {
    createUser,
    findUserByUsername
}
