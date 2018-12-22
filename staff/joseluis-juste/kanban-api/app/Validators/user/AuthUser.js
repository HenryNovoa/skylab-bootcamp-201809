const ValidationException = use('App/Exceptions/ValidationException')

'use strict'

class AuthUser {
  
  get rules () {
    return {
      username:'required',
      password:'required'
    }
  }

  get messages () {
    return {
       
      'username.required':'The username field is required',
      'password.required':'The password field is required'
     
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

module.exports = AuthUser
