const db = require('../db')

const getProfileByUserId = (user_id) => {
    return db.prepare('SELECT user_id as id, name, age, gender, bio, updated_at FROM profiles WHERE user_id = ?').get(user_id)
}

const createProfile = (user_id) => {
    const now = Date.now()
    db.prepare(`
        INSERT INTO profiles (user_id, name, age, gender, bio, updated_at) VALUES (?, ?, ?, ?, ?, ?)
    `).run(user_id, null, null, null, null, now)
    return getProfileByUserId(user_id)
}

const updateProfile = (user_id, { name, age, gender, bio }) => {
    const now = Date.now()
    const exists = db.prepare('SELECT user_id, name, age, gender, bio FROM profiles WHERE user_id = ?').get(user_id)
    if (!exists) {
        return null
    }

    db.prepare(`
        UPDATE profiles SET name = ?, age = ?, gender = ?, bio = ?, updated_at = ? WHERE user_id = ?
    `).run(name || exists.name, age || exists.age, gender || exists.gender, bio || exists.bio, now, user_id)
    return getProfileByUserId(user_id)
}

module.exports = {
    getProfileByUserId,
    createProfile,
    updateProfile
}
