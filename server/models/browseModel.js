const db = require('../db')

const listProfiles = (limit = 5, offset = 0, self_id) => {
    if (!Number.isInteger(limit) || !Number.isInteger(offset)) {
        throw new Error('limit, offset must be integers')
    }

    const query = `
        SELECT user_id as id, name, age, gender, bio
        FROM profiles
        WHERE user_id != ?
        LIMIT ? OFFSET ?
    `

    return db.prepare(query).all(self_id, limit, offset)
}

module.exports = {
    listProfiles,
}
