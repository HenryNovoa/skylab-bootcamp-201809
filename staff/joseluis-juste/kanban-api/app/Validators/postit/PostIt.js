const ValidationException = use('App/Exceptions/ValidationException')

'use strict'

class PostIt {
  
  get rules () {
    return {
      content:'required',
      userid:'required',
      state:'required'      
    }
  }

  get messages () {
    return {
       
      'content.required':'The content field is required',
      'userid.required':'The userid field is required',
      'state.required':'The state field is required'      
     
    }
  }

  get validateAll () {
    return true
  }

  async authorize () {
    
    return true
  }

/*
  get sanitizationRules () {
    return {
      email: 'normalize_email',
      age: 'to_int'
    }
  }*/

  async fails (errorMessages) {
    
     
     throw new ValidationException("Exists validation errors", 422, errorMessages)
     
  }

}

module.exports = PostIt
