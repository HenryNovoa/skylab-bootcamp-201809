const mongoose = require('mongoose')

const { Job, User } = require('./schemas')

module.exports = {
    Postit: mongoose.model('Job', Job),
    User: mongoose.model('User', User)
}