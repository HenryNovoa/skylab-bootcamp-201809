const AlreadyExistsError = require('./already-exists-error')
const AuthError = require('./auth-error')
const NotFoundError = require('./not-found-error')
const ValueError = require('./value-error')
const StatusError = require('./status-error')

module.exports = {
    AlreadyExistsError,
    AuthError,
    NotFoundError,
    ValueError,
    StatusError
}