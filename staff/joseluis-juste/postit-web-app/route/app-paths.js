let Logic = require("../logic/logic")

function setAppPaths(app, route) {

    route.use(function (req, res, next) {
           
        next();

    });

    route.get("/", function (req, res) {

        if (req.session.userId)
            res.redirect("/landing")
        else
            res.render('home')
    })

    route.get("/landing", function (req, res) {

        if (!req.session.userId)

            res.redirect("/")
        else {
            Logic.getUserPostIts(Number.parseInt(req.session.userId)).then(postits => {

                res.render('landing', { postits: postits, errorMessage:req.session.errorMessage, message:req.session.message},(err, html) =>{
                    req.session.errorMessage = null
                    req.session.message = null
                    res.set("Cache-Control", "no-cache, no-store, must-revalidate")
                    res.set("Pragma", "no-cache")
                    res.set("Expires", "0")   
                    res.send(html)
                })

            }).catch(err => {
                req.session.errorMessage = err
                res.redirect("/landing")
            })

        }


    })

    app.use('/', route)

}

module.exports = setAppPaths