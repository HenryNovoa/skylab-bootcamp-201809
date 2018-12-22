const BaseException = require("./BaseException")
const ExceptionHandler = require("./Handler")
'use strict'

class ValidationException extends BaseException {

    constructor(message, status, validationErrors){
        super(message, status)
        this.genericresponse.ValidationErrors = validationErrors
        
    } 
}

module.exports = ValidationException
