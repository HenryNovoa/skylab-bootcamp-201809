const uid = require('uuid/v4')

class Postit {
    constructor({ id, text }) {
        this.id = id || uid()
        this.text = text
        this.status = 'todo'
    }
}

module.exports = Postit