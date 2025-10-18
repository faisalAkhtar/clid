const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const dbPath = process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'clid.db')
const db = new Database(dbPath)

const runSeedFile = (filePath, label) => {
    if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf8')
        try {
            db.exec(sql)
            console.info(`✅ ${label} seeded successfully`)
        } catch (err) {
            if (err.message.includes('UNIQUE') || err.message.includes('constraint')) {
                console.info(`ℹ️ ${label} already exist — skipping seeding`)
            } else {
                console.error(`⚠️ Error seeding ${label}:`, err.message)
            }
        }
    } else {
        console.warn(`⚠️ Seed file not found: ${filePath}`)
    }
}

const init = () => {
    console.info('Database initialized')

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(200),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)

    db.exec(`
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE,
            name TEXT,
            age INTEGER,
            gender TEXT,
            location TEXT,
            interests TEXT,
            bio TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `)

    db.exec(`
        CREATE TABLE IF NOT EXISTS revoked_tokens (
            jti TEXT PRIMARY KEY,
            expires_at INTEGER NOT NULL
        );
    `)

    if (process.env.NODE_ENV === 'development') {
        const baseDir = __dirname + '/../data'
        runSeedFile(path.join(baseDir, 'seed_users.sql'), 'Users')
        runSeedFile(path.join(baseDir, 'seed_profiles.sql'), 'Profiles')
    }
}

init()

module.exports = db
