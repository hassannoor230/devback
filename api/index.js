import app from '../server.js'

export default (req, res) => {
  if (!req.url.startsWith('/api')) {
    req.url = `/api${req.url === '/' ? '' : req.url}`
  }

  return app(req, res)
}