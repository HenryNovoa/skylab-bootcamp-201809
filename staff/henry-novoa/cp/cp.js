
var fs = require('fs');
const { argv: [, , input, output] } = process
// destination.txt will be created or overwritten by default.

// fs.copyFile(input, output, (err) => {
//     if (err) throw err;
    
//     console.log(`${input} was copied to ${output}`)
// })
    let readStream = fs.createReadStream(input)
    readStream.pipe(fs.createWriteStream(output))

 