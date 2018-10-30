let net = require('net')
const [,,port] = process.argv

function returnTime(){
    let time = new Date()
    let date = ''

   date += time.getFullYear() + '-'
   date += time.getMonth()+1 + '-'    // starts at 0
   date += time.getDate() + ' '    // returns the day of month
   date += time.getHours()+ ':'
   date += time.getMinutes() +'\n'
   return date 
}







var server = net.createServer(function (socket) { 
    socket.end(returnTime())                    
  })                                                
  server.listen(port)                               