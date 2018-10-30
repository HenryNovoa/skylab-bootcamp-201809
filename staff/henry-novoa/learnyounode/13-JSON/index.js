var http = require('http')
var url = require('url')
const [, , port] = process.argv

var server = http.createServer(function (req, res) {
    var request = url.parse(req.url, true)
    var obj = {}
    var date = new Date(request.query.iso)
  
    if (request.pathname === '/api/parsetime') {
        obj.hour = date.getHours()
        obj.minute = date.getMinutes()
        obj.second = date.getSeconds()
        res.writeHead('200', { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(obj))

    } else if (request.pathname === '/api/unixtime') {
        obj.unixtime = date.getTime()
        res.writeHead('200', { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(obj))

    }
    res.end()
})

server.listen(port);
