var fs = require('fs')
var path = require('path')

module.exports = function (dir, ext, callback) {
    fs.readdir(dir, function (err, list) {
        if (err) return callback(err)
        var res = []
        for (var i = 0; i < list.length; i++) {
            if (path.extname(list[i]).split('.')[1] === ext) {
                res.push(list[i])
            }
        }

        callback(null, res)
    })
}
