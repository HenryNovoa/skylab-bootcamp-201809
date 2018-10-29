/* main.js */
var myModule = require('./module');
var directory = process.argv[2];
var filter = process.argv[3];


myModule(directory,filter,(err,list)=>{
    if(err) return err
    list.forEach(element => {
        console.log(element)        
    })
})
