const [, , port, file] = process.argv

var fs = require('fs')

var http = require('http')

var server = http.createServer(function (req, res) {
     //console.log(req)
   var redStream= fs.createReadStream(file)
   redStream.pipe(res)
})
server.listen(port)
