/**
 *  This file exports the models that will be used by the logic. It takes the schemas from schemas.js
 */

const mongoose = require('mongoose')

const { Postit, User } = require('./schemas')

const PostitModel = mongoose.model('Postit', Postit)
const UserModel = mongoose.model('User', User)

module.exports = {
    Postit: PostitModel,
    User: UserModel
}