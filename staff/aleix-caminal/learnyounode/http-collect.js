var http = require('http')

http.get(process.argv[2], function(response) {
    var res = ''
    response.on('data', function (data) {
        res += data
    })

    response.on('end', function () {
        console.log(res.length)
        console.log(res.toString())
    })
})
