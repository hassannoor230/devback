import TeamMember from '../models/TeamMember.js'

export const getTeam = async (req, res) => {
  const team = await TeamMember.find().sort({ createdAt: -1 })
  res.json(team)
}

export const createTeamMember = async (req, res) => {
  const member = await TeamMember.create(req.body)
  res.status(201).json(member)
}

export const updateTeamMember = async (req, res) => {
  const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!member) return res.status(404).json({ message: 'Team member not found' })
  res.json(member)
}

export const deleteTeamMember = async (req, res) => {
  const member = await TeamMember.findByIdAndDelete(req.params.id)
  if (!member) return res.status(404).json({ message: 'Team member not found' })
  res.json({ message: 'Team member deleted' })
}
