const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const API_VERSION = '/api/v1/'

app.use(helmet())
app.use(cors())

app.use(express.json())



app.get(`${API_VERSION}hc`, (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Healthy'
  })
})

//API
app.use(`${API_VERSION}position`, require('./routes/position.controller'))


//end API

let notFoundMethod = ['get', 'post', 'put', 'patch', 'delete']

for(const method of notFoundMethod) {
  app[method]('*', (req, res) => {
    res.status(404).send({
      message: 'Page not found'
    })
  })
}

module.exports = app