import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const login = async (req, res) => {
  const { email, password } = req.body || {}

  if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const normalizedEmail = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: 'A valid email is required' })
  }

  if (!process.env.JWT_SECRET) {
    console.error('Login configuration error: JWT_SECRET is not configured')
    return res.status(500).json({ message: 'JWT_SECRET is not configured' })
  }

  try {
    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({ token, user: { id: user._id, email: user.email } })
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({ message: 'Unable to complete login' })
  }
}

export const getMe = async (req, res) => {
  res.json({ user: req.user })
}
