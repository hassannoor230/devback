import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
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
}

export const getMe = async (req, res) => {
  res.json({ user: req.user })
}
