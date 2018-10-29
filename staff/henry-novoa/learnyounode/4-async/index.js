var fs = require('fs')
let res
fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) throw err
    
    res = data.split('\n')
    
    console.log(res.length - 1)

})



//console.log(file.length-1)
//console.log(res.length-1)