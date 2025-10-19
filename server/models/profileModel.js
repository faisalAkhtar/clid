const db = require('../db')

const getProfileByUserId = (user_id) => {
    return db.prepare(`
        SELECT user_id as id, name, age, gender, location, interests, bio, updated_at
        FROM profiles WHERE user_id = ?
    `).get(user_id)
}

const createProfile = (user_id) => {
    db.prepare(`
        INSERT INTO profiles (user_id) VALUES (?)
    `).run(user_id)
    return getProfileByUserId(user_id)
}

const updateProfile = (user_id, { name, age, gender, bio, location, interests }) => {
    const now = Date.now()
    const exists = db.prepare(`
                    SELECT user_id, name, age, gender, location, interests, bio
                    FROM profiles WHERE user_id = ?
                  `).get(user_id)
    if (!exists) return null

    db.prepare(`
        UPDATE profiles
        SET name = ?, age = ?, gender = ?, location = ?, interests = ?, bio = ?, updated_at = ?
        WHERE user_id = ?
    `).run(
        name || exists.name,
        age || exists.age,
        gender || exists.gender,
        location || exists.location,
        interests || exists.interests,
        bio || exists.bio,
        now, user_id)

    return getProfileByUserId(user_id)
}

module.exports = {
    getProfileByUserId,
    createProfile,
    updateProfile
}
