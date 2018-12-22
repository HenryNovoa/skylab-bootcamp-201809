const { hooks } = require('@adonisjs/ignitor')
const  GenericResponse  = require('../App/Models/OutputModels/response')
const { ioc } = require('@adonisjs/fold')

hooks.after.providersBooted(() => {
    
    ioc.bind('GenericResponse', function (app) {
       
        return new GenericResponse()
      })

})