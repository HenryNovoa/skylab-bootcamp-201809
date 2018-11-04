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

let error = null

const formBodyParser = bodyParser.urlencoded({ extended: false })

const mySession = session({
    secret: 'my super secret',
    cookie: { maxAge: 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    })
})

app.get('/', (req, res) => {
    error = null

    res.send(buildView(`<a href="/login">Login</a> or <a href="/register">Register</a>`))
})

app.get('/register', (req, res) => {
    res.send(buildView(`<form action="/register" method="POST">
            <input type="text" name="name" placeholder="Name">
            <input type="text" name="surname" placeholder="Surname">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Register</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <a href="/">go back</a>`))
})

app.post('/register', formBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        logic.registerUser(name, surname, username, password)

        error = null

        res.send(buildView(`<p>Ok! user ${name} registered.</p>
                <a href="/">go back</a>`))
    } catch ({ message }) {
        error = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.send(buildView(`<form action="/login" method="POST">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Login</button>
        </form>
        ${error ? `<p class="error">${error}</p>` : ''}
        <a href="/">go back</a>`))
})

app.post('/login', [formBodyParser, mySession], (req, res) => {
    const { username, password } = req.body

    try {
        const id = logic.authenticateUser(username, password)

        req.session.userId = id

        error = null

        res.redirect('/home')
    } catch ({ message }) {
        error = message

        res.redirect('/login')
    }
})

app.get('/home', mySession, (req, res) => {
    const id = req.session.userId
    debugger
    if (id) {
        const user = logic.retrieveUser(id)

        res.send(buildView(`<p>Welcome ${user.name}!</p>
                                  <form action="/postit" method="POST">
                                  <input type="text" name="postitText" placeholder="Type text here...">
                                 <button type="submit">Create postit</button>
                                 </form>
                                  ${error ? `<p class="error">${error}</p>` : ''}


                        <ul>${user.postits.map(post => `<li class=post>${post.text} <form action="/delete" method="POST">
                       <button type="submit">delete postit</button>
                       </form></li>`).join('')} </ul>

                        <a href="/logout">logout</a>`))
    } else res.redirect('/')
})

app.post('/postit', [formBodyParser, mySession],(req,res)=>{
    
    const { postitText } = req.body
    const id = req.session.userId
    const user = logic.retrieveUser(id)
    try{
        logic.createPostit(postitText,id)
        error = null
        res.send(buildView(`<p>Ok! Postit created</p>
                           <a href='/home'>Your posts</a>`))
    }catch ({ message }) {
        error = message
        res.redirect('/home')
    }
})

app.get('/logout', mySession, (req, res) => {
    req.session.userId = null

    res.redirect('/')
})

app.get('/users', (req, res) => {
    res.send(buildView(`<ul>
            ${logic._users.map(user => `<li>${user.id} ${user.name} ${user.surname}</li>`).join('')}
        </ul>
        <a href="/">go back</a>`))
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))