const { User, Job } = require('../data')
const { AlreadyExistsError, AuthError, NotAllowedError, NotFoundError } = require('../errors')
const validate = require('../utils/validate')
const fs = require('fs')
const path = require('path')

const cloudinary = require('cloudinary')



const { env: { CLOUDINARY_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET } } = process


cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const logic = {



    /**
     * 
     * @param {string} base64Image 
     */
    _saveImage(base64Image) {
        return Promise.resolve().then(() => {
            if (typeof base64Image !== 'string') throw new LogicError('base64Image is not a string')

            return new Promise((resolve, reject) => {
                return cloudinary.v2.uploader.upload(base64Image, function (err, data) {
                    if (err) return reject(err)

                    resolve(data.url)
                })
            })
        })
    },

    //User

    registerUser(name, surname, username, password) {
        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            let user = await User.findOne({ username })

            if (user) throw new AlreadyExistsError(`username ${username} already registered`)

            user = new User({ name, surname, username, password })

            await user.save()
        })()
    },

    authenticateUser(username, password) {
        validate([{ key: 'username', value: username, type: String }, { key: 'password', value: password, type: String }])

        return (async () => {
            const user = await User.findOne({ username })

            if (!user || user.password !== password) throw new AuthError('invalid username or password')

            return user.id
        })()
    },

    retrieveUser(id) {
        validate([{ key: 'id', value: id, type: String }])

        return (async () => {
            const user = await User.findById(id, { '_id': 0, password: 0, __v: 0 }).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.id = id

            return user
        })()
    },

    updateUser(id, name, surname, username, newPassword, password) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'name', value: name, type: String, optional: true },
            { key: 'surname', value: surname, type: String, optional: true },
            { key: 'username', value: username, type: String, optional: true },
            { key: 'password', value: password, type: String }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (user.password !== password) throw new AuthError('invalid password')

            if (username) {
                const _user = await User.findOne({ username })

                if (_user) throw new AlreadyExistsError(`username ${username} already exists`)

                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                user.username = username
                newPassword != null && (user.password = newPassword)

                await user.save()
            } else {
                name != null && (user.name = name)
                surname != null && (user.surname = surname)
                newPassword != null && (user.password = newPassword)

                await user.save()
            }
        })()
    },
    insertPhotoToJob(userId ,jobId, chunk) {
        validate([
            { key: 'id', value: jobId, type: String },
            { key: 'id', value: userId, type: String },
            { key: 'chunk', value: chunk, type: String },
        ])

        return (async () => {

            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${userId} not found`)

            const job = await Job.findById(jobId)

            if(job.user ==! user.id) throw Error('job and its owner don\'t match')

            const imageCloudinary = await this._saveImage(chunk)
           
            job.pictures.push(imageCloudinary)
            
            await job.save()
            

        })()

    },

    createJob(details) {

        const { title,userId, budget, contact, description, location, tags, photo } = details

        validate([
            { key: 'id', value: userId, type: String },
            { key: 'title', value: title, type: String },
            { key: 'budget', value: budget, type: String, optional: true },
            { key: 'contact', value: contact, type: String, optional: true },
            { key: 'description', value: description, type: String, optional: true },
            { key: 'location', value: location, type: String },
            { key: 'photo', value: photo, type: String },

        ])


        return (async () => {
            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const job = new Job({ title,budget, contact, description, location, tags, photo, user: userId })

            await job.save()
        })()

    },
    //fetches one job
    getJob(userId,jobId) {
        debugger
        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'jobId', value: jobId, type: String }
        ])

        return (async () => {
            const user = await User.findById(userId).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const job = await Job.findById(jobId)
                .lean()
            debugger
            
                job.id = job._id.toString()

                delete job._id

                job.user = job.user.toString()

                if (job.assignedTo)
                    job.assignedTo = job.assignedTo.toString()

                if(job.requestedBy)
                    job.requestedBy.forEach((request,index)=>{
                        job.requestedBy[index] = request.toString()
                    })    

                return job
        
        })()
    },

    //list jobs from one particular user
    listJobs(id) {
        validate([
            { key: 'id', value: id, type: String }
        ])

        return (async () => {
            const user = await User.findById(id).lean()

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const jobs = await Job.find({ $or: [{ user: user._id }, {requestedBy: {$gte:user._id }}] })
                .lean()

            jobs.forEach(job => {
                job.id = job._id.toString()

                delete job._id

                job.user = job.user.toString()

                if (job.assignedTo)
                    job.assignedTo = job.assignedTo.toString()
    

                return job
            })

            return jobs
        })()
    },
    //lists all jobs
    listAllJobs(){


        return (async () => {
        
            const jobs = await Job.find().lean()
            
            jobs.forEach(job => {
                job.id = job._id.toString()

                delete job._id

                job.user = job.user.toString()

                if (job.assignedTo)
                    job.assignedTo = job.assignedTo.toString()

                return job
            })

            return jobs
        })()
        
    },

    //lists users that have requested to do a job
 listRequestedBy(creatorId,jobId) {
        validate([
            { key: 'id', value: creatorId, type: String },
            { key: 'id', value: jobId, type: String }
        ])

        return (async () => {
            const user = await User.findById(creatorId)

            if (!user) throw new NotFoundError(`user with id ${creatorId} not found`)

            const job = await Job.findById(jobId)

            const solicitors = await Promise.all(job.requestedBy.map(async solicitorId => await User.findById(solicitorId)))

            return solicitors.map(({ id, username }) => ({ id, username }))
        })()
    },

    //removes a job
    removeJob(id, postitId) {
        validate([
            { key: 'id', value: id, type: String },
            { key: 'postitId', value: postitId, type: String }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const job = await Job.findOne({ user: user._id, _id: postitId })

            if (!job) throw new NotFoundError(`postit with id ${job} not found`)

            await job.remove()
        })()
    },

    //modifies a set characteristics from the job
    modifyJob(details) {
        const { userId,newTitle, jobId, newBudget, newContact, newDescription, newLocation, newStatus, assignedTo, newTags } = details

        validate([
            { key: 'id', value: userId, type: String },
            { key: 'title', value: newTitle, type: String, optional: true },
            { key: 'jobId', value: jobId, type: String },
            { key: 'assignedTo', value: assignedTo, type: String, optional: true },
            { key: 'budget', value: newBudget, type: String, optional: true },
            { key: 'contact', value: newContact, type: String, optional: true },
            { key: 'description', value: newDescription, type: String, optional: true },
            { key: 'location', value: newLocation, type: String, optional: true },
            { key: 'status', value: newStatus, type: String, optional: true },

        ])
        //validation for tags
        if(newTags) newTags.forEach( tag  => {
          if(tag ==! 'string') throw TypeError(`${tag} is not a string`)    
        })


        return (async () => {
            const user = await User.findById(userId)

            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const job = await Job.findOne({ user: userId, _id: jobId })

            if (!job) throw new NotFoundError(`job with id ${jobId} not found`)

            job.description = newDescription || job.description

            job.budget = newBudget || job.budget

            job.contact = newContact || job.contact

            job.location = newLocation || job.location

            job.status = newStatus || job.status

            job.assignedTo = assignedTo || job.assignedTo

            job.tags = newTags || job.tags

            job.title = newTitle || job.title


            await job.save()
        })()
    },

    requestJob(requestId, jobId) {
        validate([
            { key: 'id', value: requestId, type: String },
            { key: 'jobId', value: jobId, type: String }
        ])
        debugger
        return (async () => {
            const requester = await User.findById(requestId)
            debugger
            if (!requester) throw new NotFoundError(`user with id ${requestId} not found`)

            const job = await Job.findById(jobId)

            if (!job) throw new NotFoundError(`job with id ${requestId} not found`)

            if (requestId === job.user) throw new NotAllowedError('user cannot add himself as a collaborator')

            job.requestedBy.forEach(_requesterId => {
                if (_requesterId === requestId) throw new AlreadyExistsError(`requester with id ${requestId} already has a request with with id ${jobId}`)
            })

            job.requestedBy.push(requestId)

            await job.save()
        })()

    },

    assignJob(requesteeId, requesterId, jobId) {
        validate([
            { key: 'id', value: requesteeId, type: String },
            { key: 'jobId', value: jobId, type: String },
            { key: 'requesterId', value: requesterId, type: String }
        ])

        return (async () => {
            const user = await User.findById(requesteeId)

            if (!user) throw new NotFoundError(`user with id ${requesteeId} not found`)

            const job = await Job.findOne({ user: user._id, _id: jobId })

            if (!job) throw new NotFoundError(`job with id ${jobId} not found`)

            job.assignedTo = requesterId

            await job.save()
        })()
    },

    rateJob(postedJobId,jobId,rating,ratingText){
        validate([
            { key: 'id', value: postedJobId, type: String },
            { key: 'jobId', value: jobId, type: String },
            { key: 'rating', value: rating, type: Number, optional: true },
            { key: 'ratingtext', value: ratingText, type: String, optional: true }
        ])

        return (async () => {
            const user = await User.findById(postedJobId)

            if (!user) throw new NotFoundError(`user with id ${postedJobId} not found`)

            const job = await Job.findOne({ user: user._id, _id: jobId })

            if (!job) throw new NotFoundError(`job with id ${jobId} not found`)

            job.rating = rating 

            job.ratingText = ratingText

            await job.save()
        })()



    }


}



module.exports = logic