import db from './connection.js'

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN('owner', 'admin', 'user')) NOT NULL DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

db.run(`
    INSERT OR IGNORE INTO users (username, email, password, role) VALUES
    ('owner', 'owner@spirituality.com', '$2a$12$HZu0EhHmkyS0ddL99QfL.uQKndMyzKm5eOH4iParVaq35vtM1Sp6a', 'owner')
`)

console.log('Database setup completed')
