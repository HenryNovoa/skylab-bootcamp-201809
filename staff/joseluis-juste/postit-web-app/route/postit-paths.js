let bodyParser = require('body-parser')
let Logic = require("../logic/logic")

function setPostitPaths(app, route) {

    let urlencodedParser = bodyParser.urlencoded({ extended: false })

    route.use(function (req, res, next) {
        next();
    });

    route.post("/add", urlencodedParser, function (req, res) {

        if (!req.session.userId)
            res.redirect("/")
        else {
            if (req.body.method && req.body.method === "PUT") {
                Logic.editPostit(req.body.content, Number.parseInt(req.session.userId), Number.parseInt(req.body.postitId)).then(postits => {
                    req.session.message = "Postit edited correctly"
                    res.redirect("/landing")

                }).catch(err => {

                    req.session.errorMessage = err
                    res.redirect("/landing")
                })

            } else {
                Logic.addPosIt(req.body.content, Number.parseInt(req.session.userId)).then(postits => {
                    req.session.message = "Postit added correctly"
                    res.redirect("/landing")

                }).catch(err => {

                    req.session.errorMessage = err
                    res.redirect("/landing")
                })
            }

        }
    })


    route.delete("/delete/:postitId", urlencodedParser, function (req, res) {

        if (req.xhr) {
            res.type("json")
            res.status(200)
            req.session.message = null
            if (!req.session.userId) {
                res.send(JSON.stringify({ error: "The session of the user has ended", redirectTo: "/" }))
            } else {
                Logic.deletePostIt(Number.parseInt(req.session.userId), Number.parseInt(req.params.postitId)).then(postits => {

                    res.send(JSON.stringify({ error: null, message: "Postit delete correctly" }))

                }).catch(err => {
                    res.send(JSON.stringify({ error: err }))
                })
            }
        } else {
            if (!req.session.userId)
                res.redirect("/")
            else {
                Logic.deletePostIt(Number.parseInt(req.session.userId), Number.parseInt(req.params.postitId)).then(postits => {
                    req.session.message = "Postit delete correctly"
                    res.redirect("/landing")

                }).catch(err => {

                    req.session.errorMessage = err
                    res.redirect("/landing")
                })
            }
        }

    })

    app.use('/postit', route)

}

module.exports = setPostitPaths