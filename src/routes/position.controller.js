const express = require('express')
const router = express.Router()
const Position = require('../functions/Position')

router.get('/', async (req, res) => {

  let results = await Position.getPosition()
  results = await Position.setPosition(results)

  res.status(200).send({
    status: 200,
    message: 'Success',
    results
  })
})

router.get('/:positionId', Position.checkError(true, false), async (req, res) => {

  const { positionId } = req.params
  let results = await Position.getPosition(positionId)

  results = await Position.setPosition(results, true)

  res.status(200).send({
    status: 200,
    message: 'Success',
    results
  })
})


router.post('/', Position.checkError(false, true), async (req, res) => {

  await Position.createPosition(req)

  res.status(201).send({
    status: 201,
    message: 'Success'
  })
})

router.put('/:positionId', Position.checkError(true, true), async (req, res) => {

  await Position.updatePosition(req)

  res.status(201).send({
    status: 201,
    message: 'Success',
  })
})

router.delete('/:positionId', Position.checkError(true, false), async (req, res) => {

  const { positionId } = req.params
  await Position.deletePosition(positionId)

  res.status(200).send({
    status: 200,
    message: 'Success',
  })
})

module.exports = router