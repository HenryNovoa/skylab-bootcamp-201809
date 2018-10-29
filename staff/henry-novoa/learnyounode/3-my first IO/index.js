var fs = require('fs')

let file = fs.readFileSync(process.argv[2])

var lele = file.toString().split('\n')

console.log(lele.length-1)