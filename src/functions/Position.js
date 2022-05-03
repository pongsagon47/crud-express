const { sequelize, Op } = require('../db')
const positionModel = sequelize.import('../models/m_position')
const validator = require('validator')

module.exports = {
  getPosition: (positionId = "") => {
    let filter = {}

    if(positionId) filter = { pId: positionId }

    return positionModel.findAll({
      where: filter
    })
  },

  setPosition: async (positionList = [], setOneRow = false) => {
    const results = []
    await Promise.all(
      positionList.map(data => {
        let row = {
          positionId: data.pId,
          positionName: data.pName
        }
        results.push(row)
      })
    )

    return setOneRow ? results[0] : results
  },

  checkError: (withParam, withBody) => {
    return async (req, res, next) => {
      let errorMessage = ""
      if(withParam && errorMessage === "") {
        const { positionId } = req.params
        const check = await positionModel.findOne({
          where: {
            pId: positionId
          }
        })

        if(!validator.isInt(positionId)) {
          errorMessage = "Position id is not Number"
        } else if(!check) {
          errorMessage = "Position Data is not found"
        }
      }

      if(withBody) {
        const { positionName } = req.body
        const check = await positionModel.findOne({
          where: {
            pName: positionName
          }
        })
        if(!positionName) {
          errorMessage = "Position Name is require"
        } else if(check) {
          errorMessage = "Position Name already exist"
        }
      }

      if(errorMessage !== "") {
        res.status(400).send({
          status: 400,
          message: errorMessage
        })
      } else {
        next()
      }
    }
  },

  createPosition: req => {
    const { positionName } = req.body

    return positionModel.create({
      pName: positionName
    })
  },

  updatePosition: req => {
    const { positionId } = req.params
    const { positionName } = req.body

    return positionModel.update({
      pName: positionName
    }, {
      where: {
        pId: positionId
      }
    })
  },

  deletePosition: pId => {
    return positionModel.destroy({
      where: {
        pId
      }
    })
  }

}