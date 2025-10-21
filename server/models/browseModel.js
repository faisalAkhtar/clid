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

const listMatches = (self_id) => {
  const query = `
        SELECT p.user_id AS id, p.name, p.location
        FROM swipes s1
        JOIN swipes s2 
            ON s1.target_id = s2.user_id 
          AND s1.user_id = s2.target_id 
          AND s1.type = 'like' 
          AND s2.type = 'like'
        JOIN profiles p 
            ON p.user_id = s1.target_id
        WHERE s1.user_id = ?;
  `

  return db.prepare(query).all(self_id)
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
    listMatches,
    swipeProfile
}
