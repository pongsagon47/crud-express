const moment = require('moment')
module.exports = {
  nowDateDB: () => {
    return
  },
  db2datetime: date => {
    return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : ""
  },
  db2date: date => {
    return date ? moment(date).format('YYYY-MM-DD') : ""
  },
}