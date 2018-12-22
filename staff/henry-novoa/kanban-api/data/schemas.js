const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Postit = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'TODO'
    },
    assignedTo:{
        type: ObjectId,
        ref: 'User'
    },
    date:{
        type: Number,
        default: Date.now()
    }
})

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    buddies:[{
        type: ObjectId,
        ref: 'User'
    }]

    
})

module.exports = {
    Postit,
    User
}


