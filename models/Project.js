import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sub: { type: String, required: true },
  desc: { type: String, required: true },
  tech: [{ type: String }],
  category: { type: String, required: true },
  color: { type: String, default: '#C9A84C' },
  year: { type: String, default: '2024' },
  link: { type: String, default: '#' },
  image: { type: String, default: '' },
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)
export default Project
