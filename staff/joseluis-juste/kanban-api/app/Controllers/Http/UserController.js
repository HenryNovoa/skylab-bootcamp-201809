'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const md5 = require('js-md5')
const Env = use('Env')


class UserController extends BaseController {

    constructor(){
        super()
    }

    async index({request, response}){

        const users = await User.all()
        this.sendResponse(response, users )
    }

    async create({request, response}){

        const data = JSON.parse(request.raw())
       
            User.create(data)
            this.sendResponse(response, null, 201)
    }

    async delete({request, response}){
        
        const {id} = request.params
        const user = await User.find(id)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)            
        }
        await user.delete()
        this.sendResponse(response)
    }

    async update({request, response}){

        const {id} = request.params
        const user = await User.find(id)
        if (!user)
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)            
        
        let data = JSON.parse(request.raw())
        if (data.password) delete data.password
        user.merge(data)
        await user.save()
        this.sendResponse(response, null)
    }

    async find({request, response}){

        const {id} = request.params
        const user = await User.find(id)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${id} not exists`, 404)            
        }
        this.sendResponse(response, user)
    }

    async getPostits({request, response}){

        const {userId} = request.params
        const user = await User.find(userId)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userId} not exists`, 404)            
        }
        this.sendResponse(response, await user.postits().fetch())

    }

    async login({request, response}){

        let {username, password} = JSON.parse(request.raw())
        password = md5(password + Env.get('APP_SECRET'))
        let user = await User.query().where('password',password).andWhere('username', username).fetch()
        user = user.first()
        if (!user)
            throw new ResourceNotFoundException(`Not exists any user with the credentials provided`, 404)
        else{
            //const auth = use('auth')
            //await auth.generate(user, true)
            this.sendResponse(response, user)
        }       
    }

    async logout({request, response}){

        this.sendResponse(response, null, 204)
            
    }
}

module.exports = UserController
