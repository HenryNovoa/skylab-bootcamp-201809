'use strict'

class GenericResponse{

    constructor(){

        this.status = null
        this.data = null
        this.error = null
        this.validationErrors = null       
        
    }

    set Error(value){
        
        this.error = {
            code:value.status,
            message:value.message
        }
    }

    set ValidationErrors(value){

        this.validationErrors = value
    }
}

module.exports = GenericResponse