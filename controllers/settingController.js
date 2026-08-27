import Setting from '../models/Setting.js'

export const getSettings = async (req, res) => {
  const settings = await Setting.find()
  const settingsObj = {}
  settings.forEach(s => {
    settingsObj[s.key] = s.value
  })
  res.json(settingsObj)
}

export const updateSetting = async (req, res) => {
  const { key, value } = req.body
  const setting = await Setting.findOneAndUpdate(
    { key },
    { value },
    { new: true, upsert: true }
  )
  res.json(setting)
}

export const updateManySettings = async (req, res) => {
  const updates = req.body
  for (const [key, value] of Object.entries(updates)) {
    await Setting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    )
  }
  res.json({ message: 'Settings updated' })
}
