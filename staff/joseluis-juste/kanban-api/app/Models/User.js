'use strict'

const md5 = require('js-md5')
const Model = use('Model')

class User extends Model {

  constructor(){
     super()
  }

  static get table () {
    return 'users'
  }
 
  
  static boot () {
    
    super.boot() 
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        const Env = use('Env')
        userInstance.password = md5(userInstance.password + Env.get('APP_SECRET'))
      }
  
    })
    
  }

  static get hidden () {
    return ['password', 'created_at', 'updated_at']
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  postits () {
    return this.hasMany('App/Models/Postit')
  }

}

module.exports = User
