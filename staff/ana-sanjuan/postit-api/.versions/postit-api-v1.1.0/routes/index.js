require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')

const { env: { PORT, JWT_SECRET } } = process

const { argv: [, , port = PORT || 8080] } = process

const jsonBodyParser = bodyParser.json()

const router = express.Router()

const routeHandler = require('./route-handler')

function bearerTokenParser(req, res, next) {
    try {
        const { headers: { authorization } } = req

        const token = authorization.split(' ')[1]

        req.token = token

        next()
    } catch (err) {
        next()
    }
}

function jwtVerifier(req, res, next) {
    try {
        const { token } = req

        const { sub } = jwt.verify(token, JWT_SECRET)

        req.sub = sub

        next()
    } catch ({ message }) {
        res.json({
            status: 'KO',
            message
        })
    }
}


router.post('/users', jsonBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    routeHandler(() =>
        logic.registerUser(name, surname, username, password)
            .then(() =>
                res.json({
                    status: 'OK',
                    message: `${username} successfully registered`
                })
            )
        , res)
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { username, password } = req.body

    routeHandler(() => {
        return logic.authenticateUser(username, password)
            .then(id => {

                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    status: 'OK',
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)

})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    const { params: { id }, sub } = req

    routeHandler(() => {

        if (id !== sub) throw Error('token sub does not match id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    status: 'OK',
                    data: user
                })
            )

    }, res)
})

router.post('/users/:id/postits', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    const { text } = req.body

    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addPostit(sub, text)
            .then(user =>
                res.json({
                    status: 'OK',
                    message: 'postit added'
                })
            )
    }
        , res)

})

router.get('/users/:id/postits', [bearerTokenParser, jwtVerifier], (req, res) => {
    const { params: { id }, sub } = req

    routeHandler(() => {

        if (id !== sub) throw Error('token sub does not match s id')

        return logic.listPostits(id)
            .then(postits =>
                res.json({
                    status: 'OK',
                    data: postits
                })
            )

    }, res)
})

router.delete('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    const { params: { id, postitId }, sub } = req

    routeHandler(() => {

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.removePostit(id, postitId)
            .then(() =>
                res.json({
                    status: 'OK',
                    message: 'postit removed'
                })
            )
    }, res)

})

router.patch('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    const { text } = req.body

    const { params: { id, postitId }, sub } = req

    routeHandler(() => {
        if (id !== sub) throw Error('token sub does not match user id')

        return logic.modifyPostit(id, postitId, text)
            .then(() =>
                res.json({
                    status: 'OK',
                    message: 'postit modified'
                })
            )

    }, res)

})

router.put('/users/:id/profile', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    
    const { name, surname, newPassword, currentPassword } = req.body

    const { params: { id }, sub } = req

    routeHandler(() => {
        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateProfile(id, name, surname, newPassword, currentPassword)
            .then(() => {
                res.json({
                    status: 'OK',
                    message: 'user updated'
                })
            })

    }, res)

})

module.exports = router