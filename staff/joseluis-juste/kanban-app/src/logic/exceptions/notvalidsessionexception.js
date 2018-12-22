export default class NotValidSession extends Error {
    constructor (message) {
      super()
      Error.captureStackTrace( this, this.constructor )
      this.name = 'NotValidSession'
      this.message = message
    }
}
