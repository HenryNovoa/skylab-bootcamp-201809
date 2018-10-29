let http = require('http')
const bl = require('bl')

const [, , url] = process.argv

http.get(url, (response) => 
    response.pipe(bl((err, data) => {
    
        if (err) throw Error
        console.log(data.length)
        console.log(data.toString())

})))
