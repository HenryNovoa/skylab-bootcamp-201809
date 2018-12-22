var fs = require('fs')

const { argv: [, , originPath, destinyPath] } = process

// First we read the file
const content = fs.readFile(originPath)

fs.appendFile(destinyPath, content, (err) => {
    if (err) throw err
    console.log('The file has been saved!');
})



