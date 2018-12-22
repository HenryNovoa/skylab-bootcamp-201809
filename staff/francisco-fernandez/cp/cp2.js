const fs = require('fs')

const [,,origin,destiny] = process.argv

const text = fs.readFileSync(origin, 'utf8')

fs.writeFile (destiny, text, (err) => {
    if (err) throw err
})

/**
 * 
 * 
 */