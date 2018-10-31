var fs = require('fs');
var path = require('path');
const { argv: [, ,src, dest] } = process

var path = require('path')
var fs = require('fs')

const {argv: [,,recu, src, dest]} = process

if (recu === '-R') {
    var recursive = function(src, dest) {
        
        if(fs.lstatSync(src).isDirectory()){

            fs.mkdirSync(dest)

            fs.readdirSync(src).forEach((item) => {
            recursive(path.join(src, item),
                                path.join(dest, item))
            })
        } else fs.createReadStream(src).pipe(fs.createWriteStream(dest))
    }

    recursive(src, dest)

}else fs.createReadStream(recu).pipe(fs.createWriteStream(src))

// fs.lstat(src,(err,stats)=>{
//     console.log(stats)
// })





//Online solution

// var copyRecursiveSync = function(src, dest) {
//     var exists = fs.existsSync(src);
//     var stats = exists && fs.statSync(src);
//     var isDirectory = exists && stats.isDirectory();
//     if (exists && isDirectory) {
//       fs.mkdirSync(dest);
//       fs.readdirSync(src).forEach(function(childItemName) {
//         copyRecursiveSync(path.join(src, childItemName),
//                           path.join(dest, childItemName));
//       });
//     } else {
//       fs.linkSync(src, dest);
//     }
//   };

//   copyRecursiveSync(src,dest)


