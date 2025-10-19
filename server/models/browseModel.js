const db = require('../db')

const listProfiles = (limit = 5, offset = 0, self_id) => {
    if (!Number.isInteger(limit) || !Number.isInteger(offset)) {
        throw new Error('limit, offset must be integers')
    }

    const query = `
        SELECT profiles.*, users.username
        FROM profiles
        JOIN users ON users.id = profiles.user_id
        WHERE profiles.user_id != ?
          AND profiles.user_id NOT IN (
            SELECT target_id FROM swipes WHERE user_id = ?
          )
        LIMIT ? OFFSET ?
    `

    return db.prepare(query).all(self_id, self_id, limit, offset)
}

const swipeProfile = (userId, targetId, type, reverseLike) => {
    db.prepare(`
        INSERT INTO swipes (user_id, target_id, type) VALUES (?, ?, ?)
    `).run(userId, targetId, type)

    // TODO: separate matches table to store matched profiles for chatting

    return { match: reverseLike, alreadySwiped: false }
  }

module.exports = {
    listProfiles,
    swipeProfile
}
