import Contact from '../models/Contact.js'
import sendEmail from '../config/email.js'

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
}

export const createContact = async (req, res) => {
  const contact = await Contact.create(req.body)

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
    <p><strong>Budget:</strong> ${contact.budget || 'N/A'}</p>
    <p><strong>Message:</strong> ${contact.message}</p>
    <p><strong>Submitted at:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
  `

  try {
    await sendEmail({
      subject: `New Contact from ${contact.name}`,
      html,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
  }

  res.status(201).json(contact)
}

export const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id)
  if (!contact) return res.status(404).json({ message: 'Contact not found' })
  res.json({ message: 'Contact deleted' })
}
