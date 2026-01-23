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
  (3, 'The High Priestess', '/images/tarot/high-priestess.jpg', 'Intuition, sacred knowledge, divine feminine, subconscious'),
  (4, 'The Empress', '/images/tarot/empress.jpg', 'Fertility, nurturing, abundance, mother figure'),
  (5, 'The Emperor', '/images/tarot/emperor.jpg', 'Authority, structure, control, father figure'),
  (6, 'The Hierophant', '/images/tarot/hierophant.jpg', 'Tradition, conformity, morality, ethics'),
  (7, 'The Lovers', '/images/tarot/lovers.jpg', 'Love, harmony, relationships, choices'),
  (8, 'The Chariot', '/images/tarot/chariot.jpg', 'Control, willpower, success, determination'),
  (9, 'Strength', '/images/tarot/strength.jpg', 'Courage, bravery, confidence, inner strength'),
  (10, 'The Hermit', '/images/tarot/hermit.jpg', 'Soul searching, introspection, inner guidance'),
  (11, 'Wheel of Fortune', '/images/tarot/wheel-of-fortune.jpg', 'Good luck, karma, life cycles, destiny'),
  (12, 'Justice', '/images/tarot/justice.jpg', 'Justice, fairness, truth, law'),
  (13, 'The Hanged Man', '/images/tarot/hanged-man.jpg', 'Pause, surrender, letting go, new perspective'),
  (14, 'Death', '/images/tarot/death.jpg', 'Endings, change, transformation, transition'),
  (15, 'Temperance', '/images/tarot/temperance.jpg', 'Balance, moderation, patience, purpose'),
  (16, 'The Devil', '/images/tarot/devil.jpg', 'Shadow self, attachment, addiction, restriction'),
  (17, 'The Tower', '/images/tarot/tower.jpg', 'Sudden change, upheaval, chaos, revelation'),
  (18, 'The Star', '/images/tarot/star.jpg', 'Hope, faith, purpose, renewal, spirituality'),
  (19, 'The Moon', '/images/tarot/moon.jpg', 'Illusion, fear, anxiety, subconscious, intuition'),
  (20, 'The Sun', '/images/tarot/sun.jpg', 'Positivity, fun, warmth, success, vitality'),
  (21, 'Judgement', '/images/tarot/judgement.jpg', 'Judgement, rebirth, inner calling, absolution'),
  (22, 'The World', '/images/tarot/world.jpg', 'Completion, accomplishment, travel, fulfillment')
`);

console.log('Tarot cards table created')
