import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Project from './models/Project.js'
import TeamMember from './models/TeamMember.js'
import Setting from './models/Setting.js'
import { defaultProjects } from './config/defaultContent.js'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

const seedData = async () => {
  await User.deleteMany({})
  await Project.deleteMany({})
  await TeamMember.deleteMany({})
  await Setting.deleteMany({})

  await User.create({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  })

  await Project.insertMany(defaultProjects)

  await TeamMember.insertMany([
    {
      name: 'Hassan Noor',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 10+ years in software engineering.',
      skills: ['Strategy', 'Architecture', 'Leadership', 'Innovation'],
      initials: 'HN',
      featured: true,
    },
    {
      name: 'Usman Zafar',
      role: 'Senior Software Developer & graphic designer',
      bio: 'Former Google engineer with deep expertise in distributed systems.',
      skills: ['UX', 'UI', 'Motion', 'Brand', 'Graphic Design', 'React', 'JavaScript', 'AI', 'Node'],
      initials: 'UZ',
    },
  ])

  await Setting.insertMany([
    { key: 'contact_email', value: 'hassannoor2309@gmail.com' },
    { key: 'location', value: 'Gujranwala, Pakistan' },
  ])

  console.log('Data seeded successfully')
  process.exit(0)
}

connectDB().then(() => seedData())
