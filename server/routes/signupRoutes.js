import express from 'express'
import db from '../db/connection.js'
import passwordUtils from '../utils/passwordUtils.js'

const router = express.Router()

router.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).send({ error: 'All fields are required' })
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ error: 'Password must be at least 6 characters' })
  }

  try {
    const existingUser = await db.get(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    )

    if (existingUser) {
      return res
        .status(409)
        .send({ error: 'Username or email already exists' })
    }

    const hashedPassword = await passwordUtils.hashPassword(password)

    const result = await db.run(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    )

    res.status(201).send({
      message: 'Account created successfully',
      user: {
        id: result.lastID,
        username,
        email,
        role: 'user'
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).send({ error: 'Failed to create account' })
  }
})

export default router
