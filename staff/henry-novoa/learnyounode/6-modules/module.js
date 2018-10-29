var fs = require('fs')
var path = require('path')



module.exports = function(directory,filter,callback){
    fs.readdir(directory,'utf8',(err,list)=>{
        if(err) return callback(err)
        const result = list.filter(element =>  path.extname(element) == '.'+filter)
        callback(null,result)  
    })
}

