const express = require('express')
const router = express.Router()
const User = require('../functions/User')


router.get('/', async (req, res) => {
  let results = await User.getUser()
  res.status(200).send({
    status: 200,
    message: 'Success',
    results
  })
})

// router.get('/:userId', (req, res) => {
//   res.status(200).send({
//     status: 200,
//     message: 'Success'
//   })
// })


router.post('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Success'
  })
})

module.exports = router