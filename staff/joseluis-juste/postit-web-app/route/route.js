let setUserPaths = require("./user-paths")
let setAppPaths = require("./app-paths")
let setPostitPaths = require("./postit-paths")

function configRoutes(app, route){

    setUserPaths(app, route)
    setAppPaths(app, route)
    setPostitPaths(app, route)
    
}

module.exports = configRoutes