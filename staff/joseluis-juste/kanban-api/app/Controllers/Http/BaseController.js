'use strict'


class BaseController {

    constructor(){
        this.genericresponse = use("GenericResponse")         
    }

    sendResponse(response, data, status = 200){

        if (data)
            this.genericresponse.data = data
        
        this.genericresponse.status = "OK"
        response.status(status)
        response.send(this.genericresponse)
    }
}

module.exports = BaseController
