const express = require('express')
const app = express()
const serverless = require('serverless-http')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    'path': 'Home',
    'message': 'Hello, world!'
  })
})

router.get('/json', (req, res) => {
    res.json({
      'path': 'json',
      'author': 'Valerio Figueira'
    })
})

app.use('/', router)

module.exports.handler = serverless(app)
