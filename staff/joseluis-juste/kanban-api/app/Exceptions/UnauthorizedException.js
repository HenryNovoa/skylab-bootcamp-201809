const BaseException = require("./BaseException")

'use strict'

class UnauthorizedException extends BaseException {
    
    constructor(message, status){
        super(message, status)
    }  
}

module.exports = UnauthorizedException
