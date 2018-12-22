const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const jsonBodyParser = bodyParser.json()
const router = express.Router()

const logic = require('../logic')
const routeHandler = require('../routes/route-handler')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('../routes/jwt-verifier')

const { env: {  JWT_SECRET } } = process

router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { name, surname, username, password } = req.body

        return logic.registerUser(name, surname, username, password)
            .then(() => {
                res.status(201)
                res.json({
                    message: `${username} successfully registered`
                })
            }
            )
    }, res)

})

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


router.post('/users/:id/postits', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body: { text } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addPostit(id, text)
            .then(() =>
                res.json({
                    status: 'postit added'
                })
            )
    }, res)
})

router.delete('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId } } = req

        if(id!== sub) throw Error('token sub does not match user id')

        return logic.removePostit(sub, postitId)
            .then(() =>
                res.json({
                    status: 'postit removed'
                })
            )
    }, res)
})

router.get('/users/:id/postits', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listPostits(id)
            .then(postits => res.json({
                data: postits
            }))
    }, res)
})

router.put('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId }, body: { text } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.modifyPostit(id, postitId, text)
            .then(() => res.json({
                message: 'postit modified'
            }))
    }, res)
})

router.put('/users/:id/modifyUser', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        debugger
        const { sub, params: { id }, body: { name, surname, username, newPassword, repeatPassword, password } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateUser(id, name, surname, username, newPassword, repeatPassword, password)
            .then(() => res.json({
                message: 'user modified'
            }))
    }, res)
})

module.exports=router