let fs = require('fs')
let path = require('path');

let [, ,recur,  or, dest] = process.argv

if (recur === "-R")
    runRecursively(or, dest)
else
    fs.createReadStream(or).pipe(fs.createWriteStream(dest))



function runRecursively(or, dest){

    if (fs.statSync(or).isDirectory()){
              
        fs.mkdirSync(dest)

        fs.readdir(or, (err, files)=>{

            files.forEach(file =>{

                runRecursively(path.join(or, file), path.join(to, file))

            })
       })
    }
}

