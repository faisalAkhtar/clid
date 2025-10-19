module.exports = (db, user_id) => {
    const stmt = db.prepare('INSERT INTO swipes (user_id, target_id, type) VALUES (?, ?, ?)')
    const label = 'Swipes'

    try {
        stmt.run(1,  user_id, 'like')
        stmt.run(2,  user_id, 'like')
        stmt.run(3,  user_id, 'like')
        stmt.run(4,  user_id, 'like')
        stmt.run(5,  user_id, 'like')
        stmt.run(7,  user_id, 'like')
        stmt.run(8,  user_id, 'like')
        stmt.run(10, user_id, 'like')
        stmt.run(12, user_id, 'like')
        stmt.run(14, user_id, 'like')
        stmt.run(16, user_id, 'like')
        stmt.run(18, user_id, 'like')
        stmt.run(20, user_id, 'like')
        stmt.run(22, user_id, 'like')
        stmt.run(25, user_id, 'like')
        stmt.run(28, user_id, 'like')
        stmt.run(30, user_id, 'like')
        stmt.run(33, user_id, 'like')
        stmt.run(35, user_id, 'like')
        stmt.run(40, user_id, 'like')
        console.info(`✅ ${label} seeded successfully`)
    } catch (err) {
        if (err.message.includes('UNIQUE') || err.message.includes('constraint')) {
            console.info(`ℹ️ ${label} already exist — skipping seeding`)
        } else {
            console.error(`⚠️ Error seeding ${label}:`, err.message)
        }
    }
}
