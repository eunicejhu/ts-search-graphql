import express from 'express'
import path from 'path'

const PORT = 3002

function startExpressServer() {
  const app = express()
  app.use('/static', express.static(path.join(__dirname, 'public')))

  const options = {
    root: path.join(__dirname, 'public'),
    headers: {
      'Content-Type': 'text/plain',
    },
  }
  app.get('/codes.txt', (req, res) => {
    res.sendFile('codes.txt', options)
  })

  app.listen(PORT, () => {
    console.log('EXPRESS server listening on ', PORT)
  })
}

export default startExpressServer
