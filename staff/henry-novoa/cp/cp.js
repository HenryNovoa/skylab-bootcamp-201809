
const fs = require('fs');
const { argv: [, ,src, dest] } = process



    const rs = fs.createReadStream(src)

    const ws = fs.createWriteStream(dest)
     
    rs.pipe(ws)
    
    rs.on('end', () => printMem())
    
    function printMem() {
        console.log(process.memoryUsage().rss / 1024 / 1024)
    }
    




//myCode
// fs.copyFile(input, output, (err) => {
//     if (err) throw err;

//     console.log(`${input} was copied to ${output}`)
// })

// let readStream = fs.createReadStream(input)
// readStream.pipe(fs.createWriteStream(output))

