var fs = require('fs')
const path = require('path')

const[, , path,ext]= process.argv


fs.readdir(process.argv[2],'utf8', (err, list)=>{
    if(!err){
        let result = list.filter(element => element.includes('.'+process.argv[3]))
       
        for(let i=0;i<result.length;i++) console.log(result[i])  
    }
})




