const fs = require('fs');

const { argv: [, , origin, destiny] } = process

console.log(process.memoryUsage().rss /1024 /1024)

const copyfile = fs.createReadStream(origin)

console.log(process.memoryUsage().rss /1024 /1024)

copyfile.pipe(fs.createWriteStream(destiny))

