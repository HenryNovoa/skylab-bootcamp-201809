let express = require('express')
let configRoutes = require("./route/route")
let session = require('express-session')
const FileStore = require('session-file-store')(session)

const { argv: [, , port = process.env.PORT || 8080] } = process
let app = express()

app.use(session({
    secret: 'my super secret',
    cookie: { expires: new Date((Date.now()) + 15000 + 3600000)},
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
        path: './.sessions'
    })
    
}))


app.use(express.static('./public'))
app.set('view engine', 'pug')

configRoutes(app, express.Router())

app.listen(port)