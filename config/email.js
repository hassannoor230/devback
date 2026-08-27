import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: `"Devcorex" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      subject: options.subject,
      html: options.html,
    })
    return info
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

export default sendEmail
