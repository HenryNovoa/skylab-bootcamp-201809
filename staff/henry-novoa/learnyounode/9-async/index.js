let http = require('http')
let result = []
const argv = process.argv.slice(2)
const [,,...paths] = process.argv
let count= 0



argv.forEach((path,index) => {
   http.get(path, res =>{

       res.setEncoding('utf8')

       let allData = ''
       res.on('data', (chunk) => allData += chunk)
      
      
       res.on('end', () => {
           result[index] = allData
           count++

          if (count === paths.length) result.forEach(res => console.log(res))
        
       })

   })
})

// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0

// function printResults () {
//   for (var i = 0; i < 3; i++) {
//     console.log(results[i])
//   }
// }

// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err) {
//         return console.error(err)
//       }

//       results[index] = data.toString()
//       count++

//       if (count === 3) {
//         printResults()
//       }
//     }))
//   })
// }

// for (var i = 0; i < 3; i++) {
//   httpGet(i)
// }
