let bodyParser = require('body-parser')
let Logic = require("../logic/logic")


function setUserPaths(app, route) {

    let urlencodedParser = bodyParser.urlencoded({ extended: false })

    route.use(function (req, res, next) {

        next();
    });

    route.get("/register", urlencodedParser, function (req, res) {

        res.render('register', { errorMessage: req.session.errorMessage, message:req.session.message }, (err, html) => {
            req.session.errorMessage = null
            req.session.message = null
            res.send(html)
        })

    })

    route.post("/register", urlencodedParser, function (req, res) {

        Logic.register(req.body).then(data => {

            req.session.message = "The account has been created correctly"
            res.redirect("/register")

        }).catch(err => {
            req.session.errorMessage = err
            res.redirect("/user/register")
        })
    })

    route.get("/login", function (req, res) {

        if (req.session.userId)

            res.redirect("/landing")
        else {
            res.render('login', { errorMessage: req.session.errorMessage }, (err, html) => {
                delete req.session.errorMessage
                res.send(html)
            })
        }



    })

    route.post("/login", urlencodedParser, function (req, res) {

        Logic.login(req.body.username, req.body.password).then(userId => {

            req.session.userId = userId
            res.redirect("/landing")

        }).catch(err => {

            req.session.errorMessage = err
            res.redirect("/user/login")
        })
    })

    route.get("/logout", urlencodedParser, function (req, res) {

        delete req.session.userId
        res.redirect("/")
    })

    app.use('/user', route)
}

module.exports = setUserPaths