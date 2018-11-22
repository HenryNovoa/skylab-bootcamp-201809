const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')
const Busboy = require('busboy')
const fs = require('fs')
const cloudinary = require('cloudinary')
const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process


cloudinary.config({
    cloud_name: 'skylab-handyman',
    api_key: '772161371929274',
    api_secret: '26OshHlvAVT4GLSzSMgzSMLl94M'
})



//Register User
router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { name, surname, username, password } = req.body

        return logic.registerUser(name, surname, username, password)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully registered`
                })
            })
    }, res)
})

//Authenticate User
router.post('/auth', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)
})

//Retrieve User
router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})


//Update User
router.patch('/users/:id', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { name, surname, username, newPassword, password } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateUser(id, name ? name : null, surname ? surname : null, username ? username : null, newPassword ? newPassword : null, password)
            .then(() =>
                res.json({
                    message: 'user updated'
                })
            )
    }, res)
})





//add collaborator
router.patch('/users/:id/collaborators', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { collaboratorUsername } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addCollaborator(id, collaboratorUsername)
            .then(() =>
                res.json({
                    message: 'collaborator added'
                })
            )
    }, res)
})


//list requestedBy
router.get('/users/:id/jobs/:jobId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listRequestedBy(id,jobId)
            .then(requestedBy =>
                res.json({
                    data: requestedBy
                })
            )
    }, res)
})
//save user photo
router.post('/users/:id/photo', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return new Promise((resolve, reject) => {
            const busboy = new Busboy({ headers: req.headers })

            busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                logic.saveUserPhoto(id, file, filename)
            })

            busboy.on('finish', () => resolve())

            busboy.on('error', err => reject(err))

            req.pipe(busboy)
        })
            .then(() => res.json({
                message: 'photo uploaded'
            }))
    }, res)
})

//retrieve user photo
router.get('/users/:id/photo', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return Promise.resolve()
            .then(() => logic.retrieveUserPhoto(id))
            .then(photoStream => photoStream.pipe(res))
    }, res)
})


//create job
router.post('/users/:id/jobs', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body:{ title,budget,contact,description,location,tags,pictures  } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.createJob({userId:id,title, budget,contact,description,location,tags,pictures})
            .then(() => res.json({
                message: 'job created'
            }))

    }, res)
})

//get jobs from one User
router.get('/users/:id/jobs', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listJobs(id)
            .then(jobs => res.json({
                data: jobs
            }))
    }, res)
})

//get all jobs
router.get('/jobs', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listAllJobs()
            .then(jobs => res.json({
                data: jobs
            }))
    }, res)
})



//modify job
router.put('/users/:id/jobs/:jobId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, jobId }, body: {newTitle ,newBudget,newContact,newDescription,newLocation,newStatus,assignedTo,newTags } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.modifyJob({userId:id,jobId, newBudget,newTitle, newContact,newDescription,newLocation,newStatus,assignedTo,newTags})
            .then(() => res.json({
                message: 'job modified'
            }))
    }, res)
})


//Add photo to job
router.patch('/users/:userId/jobs/:jobId/pictures', jsonBodyParser, (req, res) => {
    routeHandler(()=>{
        const { sub, body: { base64Image }, params: { userId , jobId }  } = req

        if (id !== sub) throw Error('token sub does not match user id')
    
        return logic.insertPhotoToJob(userId,jobId,base64Image)
        .then(() => res.json({
            message: 'photo added'
        }))
        
    },res)
    
})

//remove job
router.delete('/users/:id/jobs/:jobId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, jobId } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.removeJob(id, jobId)
            .then(() => res.json({
                message: 'job removed'
            }))
    }, res)
})


//update status
// router.patch('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
//     routeHandler(() => {
//         const { sub, params: { id, postitId }, body: { status } } = req

//         if (id !== sub) throw Error('token sub does not match user id')

//         return logic.movePostit(id, postitId, status)
//             .then(() => res.json({
//                 message: 'postit moved'
//             }))
//     }, res)
// })

// request job
router.patch('/users/:id/jobs/:jobId/requests/', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, jobId }, body: { requestId } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.requestJob(requestId,jobId)
            .then(() => res.json({
                message: 'postit assigned'
            }))
    }, res)
})

//assign job
router.patch('/users/:id/jobs/:jobId/assign', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, jobId }, body: { requestId } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.assignJob(id, requestId, jobId)
            .then(() => res.json({
                message: 'job assigned'
            }))
    }, res)
})


//rate job
router.patch('/users/:id/jobs/:jobId/rate', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, jobId }, body: { requestId, rating, ratingText } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.assignPostit(id, requestId, jobId,rating,ratingText)
            .then(() => res.json({
                message: 'job rated'
            }))
    }, res)
})

module.exports = router