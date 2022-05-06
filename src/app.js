const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const API_VERSION = '/api/v1/'

const methodAccept = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
let corsOption = {
  methods: methodAccept

}

app.use(helmet())
app.use(cors(corsOption))
app.use(express.json())

//set static folder
const dir = path.join(__dirname, 'uploads')
app.use(express.static(dir))



app.use(function(req, res, next) {
  if(methodAccept.includes(req.method)) {
    next()
  } else {
    res.status(405).send({
      status: 405,
      message: 'Method Not Allowed'
    })
  }
})

app.get(`${API_VERSION}hc`, (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Healthy'
  })
})



//API
app.use(`${API_VERSION}user`, require('./routes/user.controller'))

//end API

methodAccept.map(data => {
  const method = data.toLowerCase()
  app[method]('*', (req, res) => {
    res.status(404).send({
      message: 'Page not found'
    })
  })
})


module.exports = app