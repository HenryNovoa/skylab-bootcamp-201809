const express = require('express')

const { argv: [, , port] } = process

const app = express()

const users = []

let loggedin = false

const person = {}



app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <a href="/login">Login</a> or <a href="/register">Register</a>
    </body>
</html>`)
})

app.get('/login', (req, res) => {

    res.send(`<!DOCTYPE html>
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
</html>`)
})
app.post('/login', (req,res) =>{
   
   
    let data = ''
   
    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        const keyValues = data.split('&')

        keyValues.forEach(keyValue => {
            const [key, value] = keyValue.split('=')
                
            person[key] = value

            
        })

        users.forEach(user => {
            if(user.username === person.username && user.password === person.password){
                loggedin = true
               
            }
        })
        if(loggedin === true){ res.redirect('/home')} else{ res.redirect('/')}

//         res.send(`<!DOCTYPE html>
// <html>
//     <head>
//         <title>Hello World!</title>
//     </head>
//     <body>
//         <h1>Hello World!</h1>
//         <p>Ok! user ${user.name} registered.
//         <a href="/">go back</a>
//     </body>
// </html>`)
    })

})

app.get('/home', (req, res) => {
    if(loggedin === true){
    res.send(`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>Welcome ${person.username}</p>
        <a href="/logout">log out</a>
    </body>
</html>`)}
else{ res.redirect('/')}
})

app.get('./logout', (req,res)=>{
    loggedin = false
    person = {}
    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.send(`<!DOCTYPE html>
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
</html>`)
})

app.post('/register', (req, res) => {
    let data = ''

    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        const keyValues = data.split('&')

        const user = { id: Date.now() }

        
        keyValues.forEach(keyValue => {
            const [key, value] = keyValue.split('=')

            user[key] = value

            
        })

        users.push(user)

        res.send(`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>Ok! user ${user.name} registered.
        <a href="/">go back</a>
    </body>
</html>`)
    })
})

app.get('/users', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <ul>
            ${users.map(user => `<li>${user.id} ${user.name} ${user.surname} </li>`).join('')}
        </ul>
        <a href="/">go back</a>
    </body>
</html>`)
})

app.listen(port || 3000)