var http = require('http')
var url = require('url')
const [, , port] = process.argv

var server = http.createServer(function (req, res) {
    var lele = url.parse(req.url, true)
    var Obj = {}
    var date = new Date(lele.query['iso'])

    if (lele.pathname === '/api/parsetime') {
        Obj.hour = date.getHours()
        Obj.minute = date.getMinutes()
        Obj.second = date.getSeconds()
        res.writeHead('200', { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(Obj))

    } else if (lele.pathname === '/api/unixtime') {
        Obj.unixtime = date.getTime()
        res.writeHead('200', { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(Obj))

    }
    res.end()
})

server.listen(port);
