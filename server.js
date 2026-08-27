import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import User from './models/User.js'

import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import contactRoutes from './routes/contacts.js'
import teamRoutes from './routes/team.js'
import settingRoutes from './routes/settings.js'

dotenv.config()

const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json())

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).json({})
  }
  next()
})

const seedAdmin = async () => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.warn('Admin seeding skipped: admin credentials are not configured')
    return
  }

  try {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL }).exec()
    if (!exists) {
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      console.log('Default admin account created')
    }
  } catch (error) {
    console.error('Admin seeding error:', error.message)
  }
}

const requireDatabase = async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    next(error)
  }
}

connectDB()
  .then(() => seedAdmin())
  .catch((err) => {
    console.error('Startup error:', err.message)
  })

app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Devcorex API is running' })
})

app.use('/api/auth', requireDatabase, authRoutes)
app.use('/api/projects', requireDatabase, projectRoutes)
app.use('/api/contacts', requireDatabase, contactRoutes)
app.use('/api/team', requireDatabase, teamRoutes)
app.use('/api/settings', requireDatabase, settingRoutes)

const clientDistPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'client', 'dist')

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath))
  app.get('*', (req, res) => res.sendFile(path.join(clientDistPath, 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.json({ success: true, message: 'Devcorex API is running' })
  })
}

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

const startServer = () => {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

if (!process.env.VERCEL) {
  startServer()
}

export default app
