const { Op, models } = require('../db')
const userModel = models.user

const self = (module.exports = {
  getUser: userId => {
    return userModel.findAll()
  },
  createUser: req => {
    const { username, password, firsName, lastName, blogId, role } = req.body

    return userModel.create({

    })
  }
})