const mongoose = require('mongoose')

let db = {}
db.mongoose = mongoose
db.post = require('./post.models')
db.user = require('./user.models')
db.role = require('./role.models')
db.ROLES = ['admin', 'user']

module.exports = db