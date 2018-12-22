const logic = require('./logic')

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    describe('register', () => {
        let name, surname, username, password

        beforeEach(() => {

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            username = `username-${Math.random()}`
            password = `password-${Math.random()}`

        })

        it('should success on correct data', () => {

            logic.registerUser(name, surname, username, password)
        })
    })
})