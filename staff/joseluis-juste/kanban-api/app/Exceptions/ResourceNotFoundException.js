const BaseException = require("./BaseException")

'use strict'

class ResourceNotFoundException extends BaseException {

  constructor(message, status) {
    super(message, status)
  }
  
}

module.exports = ResourceNotFoundException
