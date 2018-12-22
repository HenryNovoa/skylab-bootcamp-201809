const AlreadyExistsError = require('./already-exists-error')
const NotFoundError = require('./not-found-error')
const ValueError = require('./value-error')
const AuthError=require('./auth-error')

module.exports = {
    AlreadyExistsError,
    NotFoundError,
    ValueError,
    AuthError 
}