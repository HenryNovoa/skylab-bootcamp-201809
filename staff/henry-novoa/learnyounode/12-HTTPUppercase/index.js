const [, , port, file] = process.argv

var fs = require('fs')

var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {

    req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase().split('').join('')
    })).pipe(res)


})
server.listen(port)

