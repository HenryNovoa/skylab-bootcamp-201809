const ValidationException = use('App/Exceptions/ValidationException')

'use strict'

class UpdateUser {
  
  get rules () {
    const userId = this.ctx.params.id
    return {

      name:'required',
      surname:'required',
      email:`required|unique:users,email,id,${userId}`,
      phone:'required',
      username:`required|unique:users,username,id,${userId}`   

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
      'username.unique':'Exists an user with the same username'     
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

module.exports = UpdateUser
