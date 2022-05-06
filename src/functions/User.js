const { Op, models } = require('../db')
const { fn } = require('../util')
const userModel = models.user
const bcrypt = require('bcrypt')
const validator = require('validator')

const self = (module.exports = {
  getUser: userId => {
    return userModel.findAll({
      where: {
        del: 'N',
        [Op.and]: [userId ? { uId: userId } : null]
      }
    })
  },

  setUser: async (userList = [], setOneRow = false) => {
    let results = []
    await Promise.all(
      userList.map(data => {
        let row = {
          userId: data.uId,
          userFirstName: data.uFirstname ? data.uFirstname : '',
          userLastName: data.uLastname ? data.uLastname : '',
          userRole: data.uRole,
          userPosition: data.uPosition,
          updateDate: data.updateDate ? data.updateDate : data.createDate
        }
        results.push(row)
      })
    )
    const resultOne = results[0] || []
    return setOneRow ? resultOne : results
  },

  checkError: (withParam, withBody) => {
    return async (req, res, next) => {
      let errorMessage = ""
      let { userId } = req.params

      if(withParam && !errorMessage) {
        if(!validator.isInt(userId)) {
          errorMessage = "User ID must be number."
        }
      }
      if(withBody) {
        let { username, oldPassword, password, firstName, lastName } = req.body

        if(validator.isEmpty(firstName, { ignore_whitespace: true })) {
          errorMessage = "The first name field is require."
        } else if(validator.isEmpty(lastName, { ignore_whitespace: true })) {
          errorMessage = "The last name field is require."
        } else if(validator.isEmpty(username, { ignore_whitespace: true })) {
          errorMessage = "The username field is require."
        }

        if(req.method === 'PATCH' && password) {
          const userData = await self.getUser(userId)
          if(userData[0]) {
            const passwordHash = userData[0].uPassword
            const checkPassword = await bcrypt.compare(oldPassword, passwordHash)
            if(!checkPassword) {
              errorMessage = "The old password field incorrect"
            }
          } else {
            errorMessage = "User data is not found."
          }
        }
      }

      if(errorMessage) {
        res.status(400).send({
          status: 400,
          message: errorMessage
        })
      } else {
        next()
      }
    }

  },

  createUser: async req => {
    let { username, password, firstName, lastName, position } = req.body

    password = await bcrypt.hash(password, 10)
    return userModel.create({
      uUsername: username,
      uPassword: password,
      uFirstname: firstName,
      uLastname: lastName,
      uPosition: position,
      uRole: 'A',
      del: 'N',
      createDate: fn.db2datetime(new Date()),
      // createBy = req.transaction.id

    })
  },

  updateUser: async req => {
    let { updateMask, username, password, firstName, lastName, position } = req.body
    const { userId } = req.params
    let updateField = {}

    updateMask.map(mask => {
      if(mask === 'username') updateField.uUsername = username
      if(mask === 'firstName') updateField.uFirstname = firstName
      if(mask === 'lastName') updateField.uLastname = lastName
      if(mask === 'position') updateField.uPosition = position

    })

    if(password && updateMask.includes('password')) {
      updateField.uPassword = password = await bcrypt.hash(password, 10)
    }

    if(Object.keys(updateField).length > 0) {
      updateField.updateDate = fn.db2datetime(new Date())
      // updateField.updateBy = req.transaction.id

      return userModel.update(updateField, {
        where: {
          uId: userId
        }
      })
    }


  },

  deleteUser: userId => {
    return userModel.update({
      del: 'Y'
    }, {
      where: {
        uId: userId
      }
    })
  }
})