const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const Meal = new Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['mondayBreak', 'tuesdayBreak', 'wednesdayBreak', 'thursdayBreak', 'fridayBreak', 'saturdayBreak', 'sundayBreak',
                'mondayLunch', 'tuesdayLunch', 'wednesdayLunch', 'thursdayLunch', 'fridayLunch', 'saturdayLunch', 'sundayLunch' ],
        required: true
    },
})

const Menu = new Schema({
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    meals: [Meal]
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
    savedMenus: [Menu]
})

module.exports = {
    Meal,
    Menu,
    User
}

