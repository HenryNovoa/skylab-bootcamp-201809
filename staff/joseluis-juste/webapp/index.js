const express = require('express')
var session = require('express-session')

const { argv: [, , port] } = process

const app = express()


app.use(session({secret: 'ssshhhhh'}));

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <a href="/login">Login</a> or <a href="/logout">Logout</a> or <a href="/register">Register</a> 
    </body>
</html>`)
})

app.get('/login', (req, res) => {
    let sess = req.session
    if (sess.islogged){
         res.redirect('/landing')

    }else{
        let sess = req.session
        let message = undefined
        if (sess.error) message = sess.error
        delete sess.error
        res.send(`<!DOCTYPE html>
    <html>
        <head>
            <title>Hello World!</title>
        </head>
        <body>
    
            ${message ? `<h1 style="color:red">${message}</h1>` : `<h1></h1>`}
            
            <h1>Hello World!</h1>
            <form action="/login" method="POST">
                <input type="text" name="username" placeholder="username">
                <input type="password" name="password" placeholder="password">
                <button type="submit">Login</button>
            </form>
            <a href="/">go back</a>
        </body>
    </html>`)
    
    }

})

app.get('/register', (req, res) => {
    
    let sess = req.session
    let messages = []
    if (sess.error){       
        if (sess.error.length > 0) messages = Array.from(sess.error)
        delete sess.error
    }
    
    res.send(`<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
        <style>
        ul{
            list-style:none;
            padding:0;
            margin:0;
            border:1px solid black;
            margin-top:1em;
            width: 30%;
        }
        ul li{

            padding:1em;
            color:red;

        }
            
        </style>
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
        ${messages.length > 0 ? `<ul>` + messages.map(message => `<li>${message}</li>`).join("") + `</ul>`: ""}
        <a href="/">go back</a>
    </body>
</html>`)
})

app.post('/register', (req, res) => {
    let data = ''
    let sess = req.session
    req.on('data', chunk => data += chunk)

    req.on('end', () => {
        const keyValues = data.split('&')

        const user = { id: Date.now() }

        keyValues.forEach(keyValue => {
            const [key, value] = keyValue.split('=')

            user[key] = value
        })
        sess.error = []
        for(let p in user){
            
            if (!user[p].length && p !== "id"){
                sess.error.push(`The ${p} field can not be empty`)
            }
        }
        if (sess.error.length > 0){
            res.redirect('/register');
        }
        else{
            if(!sess.users) sess.users = []
            sess.users.push(user)

            res.send(`<!DOCTYPE html>
            <html>
                <head>
                    <title>Hello World!</title>
                </head>
                <body>
                    <h1>Register</h1>
                    <p>Ok! user ${user.name} registered.
                    <a href="/">go back</a>
                </body>
            </html>`)
        }


    })
})

app.post('/login', (req, res) => {
    let data = ''
    let sess = req.session

   
       
    if (!sess.users){ res.redirect('/register')
    }else{
        req.on('data', chunk => data += chunk)

        req.on('end', () => {
            const keyValues = data.split('&')
    
            const user = { id: Date.now() }
    
            keyValues.forEach(keyValue => {
                const [key, value] = keyValue.split('=')
    
                user[key] = value
            })
            

           if(sess.users.find(_user => _user.username === user.username && _user.password === user.password)){
               
                sess.islogged = true
                sess.user = user
                res.redirect('/landing')
           }
           else{
                
                sess.error = "The credentials are not correct..."
               res.redirect('/login');
           }
    
        })
    }


})

app.get('/landing', (req, res) => {
    let sess = req.session
    if (!sess.islogged)  res.redirect('/login')
    else{
        res.send(`<!DOCTYPE html>
        <html>
            <head>
                <title>Landing</title>
            </head>
            <body>
                <h1>Hello ${sess.user.username}</h1>
                <a href="/">go back</a>
            </body>
        </html>`)
    }
  

})

app.get('/users', (req, res) => {
    let sess = req.session
    let users = sess.users || []
   
    res.send(`<!DOCTYPE html>
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
</html>`)
})

app.get('/logout', (req, res) => {
    let sess = req.session
    if (sess.islogged){

        delete sess.islogged
        delete sess.user
        
    }
    res.redirect('/')

})


app.listen(port || 3000)