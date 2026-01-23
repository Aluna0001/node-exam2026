import db from './connection.js'

db.exec(`
  CREATE TABLE IF NOT EXISTS tarot_cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    base_meaning TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Cards
db.run(`
  INSERT OR IGNORE INTO tarot_cards (id, name, image_url, base_meaning) VALUES
  (1, 'The Fool', '/images/tarot/fool.jpg', 'New beginnings, innocence, spontaneity, free spirit'),
  (2, 'The Magician', '/images/tarot/magician.jpg', 'Manifestation, resourcefulness, power, inspired action'),
  (3, 'The High Priestess', '/images/tarot/high-priestess.jpg', 'Intuition, sacred knowledge, divine feminine, subconscious')
`)

console.log('Tarot cards table created')
