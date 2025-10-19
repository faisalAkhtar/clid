const db = require('../db')

const validateSwipe = (req, res, next) => {
    try {
        const userId = req.user.id
        const { target_id, type } = req.body

        if (!target_id || !['like', 'pass'].includes(type)) {
            return res.status(400).json({ error: "Invalid swipe request" })
        }
        // Check if already swiped
        const existing = db.prepare("SELECT * FROM swipes WHERE user_id = ? AND target_id = ?").get(userId, target_id)
        if (existing) {
            req.swipeInfo = { alreadySwiped: true, match: false }
            return next()
        }
        // Check reverse (if they liked you) (p.s. they did not)
        const reverse = db.prepare("SELECT * FROM swipes WHERE user_id = ? AND target_id = ? AND type = 'like'").get(target_id, userId)
        req.swipeInfo = { alreadySwiped: false, reverseLike: !!reverse, type, target_id }
        next()
    } catch (err) {
        console.error("browse middleware error:", err)
        return res.status(500).json({ error: "Server error in browse middleware" })
    }
}

module.exports = {
    validateSwipe
}
