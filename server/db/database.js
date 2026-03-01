import "dotenv/config";
import db from "./connection.js";
import passwordUtils from "../utils/passwordUtils.js";

db.exec(`
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
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS horoscopes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        zodiac_sign TEXT NOT NULL,
        message TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(zodiac_sign, date)
    )
`);

const hashedPassword = await passwordUtils.hashPassword(
  process.env.OWNER_PASSWORD || "password123",
);

db.run(
  `
    INSERT OR IGNORE INTO users (username, email, password, role) VALUES
    (?, ?, ?, 'owner')
`,
  [process.env.OWNER_USERNAME, process.env.OWNER_EMAIL, hashedPassword],
);

console.log("Database setup completed");
