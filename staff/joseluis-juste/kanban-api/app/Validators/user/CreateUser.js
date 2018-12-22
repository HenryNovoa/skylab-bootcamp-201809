const ValidationException = use('App/Exceptions/ValidationException')

'use strict'

class CreateUser {
  
  get rules () {
    
    return {
      name:'required',
      surname:'required',
      email:`required|unique:users,email`,
      phone:'required',
      username:`required|unique:users,username`,
      password:'required|min:4',

    }
  }

  get messages () {
    return {
      'name.required': 'The name field is required',
      'surname.required': 'The surname field is required',
      'email.required': 'The email field is required',
      'email.unique':'Email address in use',
      'phone.required':'The phone field is required',
      'username.required':'The username field is required',
      'username.unique':'Exists an user with the same username',
      'password.required':'The password field is required',
      'password.min': 'The password field has to have four characters of minimun length'      
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

module.exports = CreateUser
