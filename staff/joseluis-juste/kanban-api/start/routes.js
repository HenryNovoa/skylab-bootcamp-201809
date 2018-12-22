'use strict'

const Route = use('Route')

Route.group(() => {

    require('./user-routes')
    require('./postit-routes')

}).prefix('api/')



