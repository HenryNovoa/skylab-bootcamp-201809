'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {

    /*constructor(message, status){

        super(message, status)
        this.genericresponse = use("GenericResponse")
    }*/
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    
    if (!error.genericresponse){
      let genericresponse = use("GenericResponse")
      genericresponse.status = error.status
      genericresponse.error = error.message
      response.status(error.status).send(genericresponse)     
    }else{
      error.genericresponse.status = error.status
      error.genericresponse.error = error.message
      response.status(error.status).send(error.genericresponse)
    }
    
     
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
