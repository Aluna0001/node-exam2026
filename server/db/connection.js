import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { fileURLToPath } from 'url'
import path from 'path'
import dotenv from 'dotenv'
import passwordUtils from "../utils/passwordUtils.js"

// Load .env from server directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const serverDir = path.dirname(__dirname)
dotenv.config({ path: path.join(serverDir, '.env') })

const connection = await open({
  filename: path.join(__dirname, '../../database.db'),
  driver: sqlite3.Database
})

// Create tables and seed owner user
await connection.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN('owner', 'user')) NOT NULL DEFAULT 'user',
        birthdate TEXT,
        show_zodiac INTEGER DEFAULT 1,
        bio TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

await connection.exec(`
    CREATE TABLE IF NOT EXISTS horoscopes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        zodiac_sign TEXT NOT NULL,
        message TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(zodiac_sign, date)
    )
`)

const hashedPassword = await passwordUtils.hashPassword(
  process.env.OWNER_PASSWORD || "password123",
)

await connection.run(
  `
    INSERT OR IGNORE INTO users (username, email, password, role) VALUES
    (?, ?, ?, 'owner')
`,
  [process.env.OWNER_USERNAME, process.env.OWNER_EMAIL, hashedPassword],
)

export default connection