'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class BaseException extends LogicalException {

    constructor(message, status){
        super(message, status) 
        this.genericresponse = use("GenericResponse")       
    }

    async handle(error, { response }){
        this.genericresponse.status = "error"
        this.genericresponse.Error = error
        response.status(error.status).send(this.genericresponse)
   }
}

module.exports = BaseException
