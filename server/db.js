const Database = require('better-sqlite3')
const path = require('path')

const dbPath = process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'clid.db')
const db = new Database(dbPath)

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
}

init()

module.exports = db
