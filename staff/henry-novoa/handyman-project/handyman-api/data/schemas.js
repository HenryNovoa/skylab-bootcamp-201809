const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Job = new Schema({
    pictures: {
        type: [String],
        ref:'User'
    },
   
    budget: {
        type: String,
        required: true
    },
   
    contact: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
  
    status: {
        type: String,
        default: 'TODO',
        enum: ['TODO', 'DOING',  'DONE'],
        required: true
    },
    rating: {
        type: Number,
        default: 3,
        enum:[1,2,3,4,5]
    },
    assignedTo: {
        type: ObjectId,
        ref: 'User'
  
    },
    doneBy:{
        type:ObjectId,
        ref: 'User'
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

    jobsAsked:[
        Job
    ]
})

module.exports = {
    Job,
    User
}

