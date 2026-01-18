import db from './connection.js'

const users = await db.all(
  'SELECT id, username, email, role, password FROM users'
)
console.log('Users in database:', users)
