var http = require('http')

var res = [], count = 0
function printResults() {
    for (var i = 0; i < 3; i++) {
        console.log(res[i])
    }
}

function getData(i) {
    http.get(process.argv[2 + i], function(response) {
        res[i] = ''
        response.on('data', function(data) {
            res[i] += data
        })

        response.on('end', function() {
            if (++count === 3) {
                printResults()
            }
        })
    })
}

for (var i = 0; i < 3; i++) {
    getData(i)
}
