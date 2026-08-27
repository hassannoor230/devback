import mongoose from 'mongoose'

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  skills: [{ type: String }],
  initials: { type: String, required: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

const TeamMember = mongoose.model('TeamMember', teamMemberSchema)
export default TeamMember
