import 'dotenv/config'
import db from './connection.js'
import passwordUtils from '../utils/passwordUtils.js'

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

const hashedPassword = await passwordUtils.hashPassword(
  process.env.OWNER_PASSWORD || 'password123'
)

db.run(
  `
    INSERT OR IGNORE INTO users (username, email, password, role) VALUES
    (?, ?, ?, 'owner')
`,
  [
    process.env.OWNER_USERNAME,
    process.env.OWNER_EMAIL,
    hashedPassword
  ]
)

console.log('Database setup completed')
