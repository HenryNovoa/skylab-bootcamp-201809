const mongoose = require('mongoose')

const { Meal, Menu, User } = require('./schemas')

module.exports = {
    Meal: mongoose.model('Meal', Meal),
    Menu: mongoose.model('Menu', Menu),
    User: mongoose.model('User', User)
}