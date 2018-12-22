'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')
const User = use('App/Models/User')
const PostIt = use('App/Models/PostIt')

class PostItController extends BaseController {
    
    constructor(){
        super()
    }

    async index({request, response}){
        
        const {userId} = request.params //este userid hay que cogerlo del token JWT (esto es provisional)
        const user = await User.find(userId)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userId} not exists`, 404)            
        }
        const postits = await PostIt.query().where("user_id",userId).fetch()
        this.sendResponse(response, postits)
    }

    async create({request, response}){

        const {content,userid, state} = request.body
        const user = await User.find(userid)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userid} not exists`, 404)            
        }
        let postit = new PostIt()
        postit.content = content
        postit.state = state
        await user.postits().save(postit)
        this.sendResponse(response, await PostIt.last())

    }

    async delete({request, response}){

        const {postitId, userId} = request.params
        const user = await User.find(userId)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userId} not exists`, 404)            
        }
        const postit = await PostIt.find(postitId)
        if (!postit){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)            
        }
        if (postit.user_id !== Number(userId)){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${userid}`, 404)            
        }
        await postit.delete()
        this.sendResponse(response)
    }

    async update({request, response}){

        const {postitId} = request.params
        const {userid, content, state} = request.body //este userid hay que cogerlo del token JWT (esto es provisional)
        const user = await User.find(userid)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userid} not exists`, 404)            
        }
        const postit = await PostIt.find(postitId)
        if (!postit){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)            
        }
        if (postit.user_id !== Number(userid)){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${userid}`, 404)            
        }
        postit.merge({content:content, state:state})        
        await user.postits().save(postit)
        this.sendResponse(response)
        
    }

    async find({request, response}){

        const {postitId, userId} = request.params
        const user = await User.find(userId)
        if (!user){
            throw new ResourceNotFoundException(`The user with the id ${userId} not exists`, 404)            
        }
        const postit = await PostIt.find(postitId)
        if (!postit){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} not exists`, 404)            
        }
        if (postit.user_id !== Number(userId)){
            throw new ResourceNotFoundException(`The postit with the id ${postitId} does not belongs to the user with the id ${userId}`, 404)            
        }
        
        this.sendResponse(response, await PostIt.find(postitId))
        
    }
}

module.exports = PostItController
