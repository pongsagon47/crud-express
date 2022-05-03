require('dotenv').config()

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const QueryTypes = Sequelize.QueryTypes

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',
    logging: false
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = { sequelize, Op, QueryTypes }