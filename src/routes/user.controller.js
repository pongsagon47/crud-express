const express = require('express')
const router = express.Router()
const User = require('../functions/User')


router.get('/', async (req, res) => {
  let results = await User.getUser()
  results = await User.setUser(results)
  res.status(200).send({
    status: 200,
    message: 'Success',
    results
  })
})

router.get('/:userId', User.checkError(true, false), async (req, res) => {
  const { userId } = req.params
  let result = await User.getUser(userId)
  result = await User.setUser(result, true)
  res.status(200).send({
    status: 200,
    message: 'Success',
    result
  })
})

router.post('/', User.checkError(false, true), async (req, res) => {
  await User.createUser(req)
  res.status(201).send({
    status: 201,
    message: 'Success'
  })
})

router.patch('/:userId', User.checkError(true, true), async (req, res) => {
  await User.updateUser(req)
  res.status(201).send({
    status: 201,
    message: 'Success',
  })
})

router.delete('/:userId', User.checkError(true, false), async (req, res) => {
  const { userId } = req.params
  await User.deleteUser(userId)

  res.status(200).send({
    status: 200,
    message: 'Success',
  })
})

module.exports = router