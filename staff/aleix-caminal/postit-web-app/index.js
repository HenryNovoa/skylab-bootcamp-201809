require('dotenv').config()
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const { sha256 } = require('js-sha256')
const UsersTable = require('./model/table/users')
const BoardsTable = require('./model/table/boards')
const PostsTable = require('./model/table/posts')

const { argv: [, , port = process.env.PORT || 3000] } = process
const app = express()
const mySession = session({
    secret: 'my super secret',
    cookie: { maxAge: 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    })
})

app.use(mySession)
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.redirect(req.session.auth && Object.keys(req.session.auth).length > 0 ? '/home' : '/login')
})

app.get('/register', (req, res) => {
    if (!req.session.auth || Object.keys(req.session.auth).length === 0) {
        res.render('register', { auth: null })
    } else {
        res.redirect('/home')
    }
})

app.get('/login', (req, res) => {
    if (!req.session.auth || Object.keys(req.session.auth).length === 0) {
        res.render('login', { auth: null })
    } else {
        res.redirect('/home')
    }
})

app.get('/logout', (req, res) => {
    req.session.auth = {}
    res.redirect('/login')
})

app.get('/home', (req, res) => {
    if (req.session.auth && Object.keys(req.session.auth).length > 0) {
        const boardsTable = new BoardsTable()
        var boards = boardsTable.contains(['posts'])
            .where({ userId: req.session.auth.id })
            .all()

        res.render('home', { auth: req.session.auth, boards })
    } else {
        res.redirect('/login')
    }
})

app.post('/register', (req, res) => {
    const usersTable = new UsersTable()
    let user = usersTable.newEntity({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    })

    usersTable.save(user)
    res.redirect('/login')
})

app.post('/login', (req, res) => {
    const usersTable = new UsersTable()
    req.session.auth = usersTable.where({
        username: req.body.username,
        password: sha256(req.body.password)
    }).first()

    res.redirect(req.session.auth && Object.keys(req.session.auth).length > 0 ? '/home' : '/login')
})

app.post('/board', (req, res) => {
    const boardsTable = new BoardsTable()
    switch (req.body.action) {
        case 'add':
            if (req.body.title) {
                var board = boardsTable.newEntity({
                    title: req.body.title,
                    userId: req.session.auth.id,
                })

                boardsTable.save(board)
            }
            break;
        case 'update':
            if (req.body.title) {
                var board = boardsTable.get(req.body.id)
                board.title = req.body.title
                boardsTable.save(board)
            }
            break;
        case 'delete':
            var board = boardsTable.get(req.body.id)
            boardsTable.delete(board)
            break;
    }

    res.redirect('/home')
})

app.post('/post', (req, res) => {
    const postsTable = new PostsTable()
    switch (req.body.action) {
        case 'add':
            if (req.body.title) {
                var post = postsTable.newEntity({
                    title: req.body.title,
                    boardId: req.body.board_id,
                })

                postsTable.save(post)
            }
            break;
        case 'delete':
            var post = postsTable.get(req.body.id)
            postsTable.delete(post)
            break;
    }

    res.redirect('/home')
})

app.patch('/post', bodyParser.json(), (req, res) => {
    const postsTable = new PostsTable()
    var post = postsTable.get(req.body.id)
    post.boardId = req.body.board_id
    post = postsTable.save(post)
    return res.send({ post })
})

app.listen(port, () => console.log(`Server up and running on port ${port}`))
