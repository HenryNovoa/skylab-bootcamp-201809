const path = require('path')
const fs = require('fs')

let options = []
for (var i = 2; i < process.argv.length; i++) {
    if (process.argv[i].charAt(0) === '-') {
        let newopts = process.argv[i].substr(1).split('');
        options = options.concat(newopts)
    }
}

const source = process.argv[process.argv.length - 2]
const target = process.argv[process.argv.length - 1]

if (options.includes('R')) {
    function recursive(source, target) {
        if (fs.lstatSync(source).isDirectory()) {
            fs.mkdirSync(target)

            fs.readdirSync(source)
                .forEach(file => recursive(path.join(source, file), path.join(target, file)))

        } else fs.createReadStream(source).pipe(fs.createWriteStream(target))
    }

    recursive(source, target)
} else {
    fs.createReadStream(source).pipe(fs.createWriteStream(target))
}
