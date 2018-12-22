const { Schema } = require('mongoose')

const Postit = new Schema({
    status : String,
    
    text: String
})

const User = new Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    postits: [Postit]
})


module.exports = {
    Postit,
    User
}
