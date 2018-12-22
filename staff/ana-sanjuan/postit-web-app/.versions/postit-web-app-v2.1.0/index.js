require('dotenv').config()
const express = require('express')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const sessionFileStore = require('session-file-store')
const FileStore = sessionFileStore(session)
const bodyParser = require('body-parser')
const buildView = require('./helpers/build-view')
const logic = require('./logic')

const { argv: [, , port = process.env.PORT || 8080] } = process

const app = express()

app.use(express.static('./public'))
app.set('view engine', 'pug')

const formBodyParser = bodyParser.urlencoded({ extended: false })

const mySession = session({
    secret: 'my super secret',
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    })
})

app.use(mySession)

app.get('/', (req, res) => {
    req.session.error = null

    res.render('landing')
})

app.get('/register', (req, res) => {
    res.render('register', { error: req.session.error })
})

app.post('/register', formBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        logic.registerUser(name, surname, username, password)
            .then(() => {
                req.session.error = null

                res.render('register-confirm', { name })
            }).catch(({ message }) => {
                req.session.err = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        req.session.error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.render('login', { error: req.session.error })
})

app.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(id => {
                req.session.userId = id

                delete req.session.postitId 
                
                req.session.error = null

                res.redirect('/home')
            })
            .catch(({ message }) => {
                req.session.error = message

                res.redirect('/')
            })
    } catch ({ message }) {
        req.session.error = message

        res.redirect('/login')
    }
})

app.get('/home', (req, res) => {
    const id = req.session.userId

    if (id) {
        try {
            logic.retrieveUser(id)
                .then(user => {
                    res.render('home', { name: user.name })
                })
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })
        } catch ({ message }) {
            req.session.error = message

            res.redirect('/')
        }
    } else res.redirect('/')

})

app.get('/postits', (req, res) => {
    const { userId: id, postitId, error } = req.session

    if (id) {
        try {
            logic.retrieveUser(id)
                .then(({ postits }) => {
                    res.render('postits', { postits, postitId, error })
                })
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })

        } catch ({ message }) {
            req.session.error = message

            res.redirect('/')
        }

    } else res.redirect('/')
})


app.post('/postits', formBodyParser, (req, res) => {
    let { text, action, postitId } = req.body
    const id = req.session.userId
    try {
        if (!action) {
            logic.createPostit(text, id)
                .then(() => res.redirect('/postits'))
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })
        } else if (action === "delete") {
            logic.deletePostit(id, postitId)
                .then(() => {
                    res.redirect('/postits')
                })
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })
        } else if (action === "edit") {
            req.session.postitId = postitId

            res.redirect('/postits')
        } else if (action === "save") {

            logic.saveEditPostit(id, postitId, text)
                .then(()=> {
                    delete req.session.postitId 

                    res.redirect('/postits')
                })
                .catch(({ message }) => {
                    req.session.error = message

                    res.redirect('/')
                })
        }
        

    } catch ({ message }) {
        req.session.error = message

        res.redirect('/login')
    }
})
app.get('/logout', (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))