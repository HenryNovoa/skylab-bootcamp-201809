const fs = require('fs')

class Postit {
    constructor(text) {

        this.id = Date.now()
        this.text = text

    }
}

module.exports = Postit