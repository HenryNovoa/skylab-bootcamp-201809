const express = require('express')
const app = express();

const { argv: [, , port] } = process
const users = []

let auth = {}

function parseData(data) {
    let result = {}
    data.split('&').forEach(keyValue => {
        const [key, value] = keyValue.split('=')
        result[key] = value
    })

    return result
}

app.get('/', (req, res) => {
    res.send(
`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <a href="/login">Login</a> or <a href="/register">Register</a>
    </body>
</html>`
    )
})

app.get('/register', (req, res) => {
    res.send(
`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <form action="/register" method="POST">
            <input type="text" name="name" placeholder="Name">
            <input type="text" name="surname" placeholder="Surname">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Register</button>
        </form>
        <a href="/">go back</a>
    </body>
</html>`
    )
})

app.get('/login', (req, res) => {
    res.send(
`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button type="submit">Login</button>
        </form>
        <a href="/">go back</a>
    </body>
</html>`
    )
})

app.get('/logout', (req, res) => {
    auth = {}
    res.redirect('/login')
})

app.get('/home', (req, res) => {
    if (auth && Object.keys(auth).length > 0) {
        res.send(
`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Welcome ${auth.name}!</h1>
        <a href="/logout">logout</a>
    </body>
</html>`
        )
    } else {
        res.redirect('/login')
    }
})

app.get('/users', (req, res) => {
    res.send(
`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <ul>
            ${users.map(user => `<li>${user.id} ${user.name} ${user.surname}</li>`).join('')}
        </ul>
        <a href="/">go back</a>
    </body>
</html>`
    )
})

app.post('/register', (req, res) => {
    let data = ''

    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        const register = parseData(data)
        const user = {
            id: Date.now(),
            name: register.name,
            surname: register.surname,
            username: register.username,
            password: register.password
        }

        users.push(user)
        res.redirect('/login')
    })
})

app.post('/login', (req, res) => {
    let data = ''

    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        const login = parseData(data)
        auth = users.find(user => user.username === login.username && user.password === login.password) || {}
        res.redirect('/home')
    })
})

app.listen(port || 3000)
