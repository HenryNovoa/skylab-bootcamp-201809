let http = require('http')

const [, , url] = process.argv

 http.get(url,(response)=> response.on('data',(data)=>{

    console.log(data.toString())
}) )

var http = require('http')

// http.get(process.argv[2], function (response) {
//   response.setEncoding('utf8')
//   response.on('data', console.log)
//   response.on('error', console.error)
// }).on('error', console.error)

