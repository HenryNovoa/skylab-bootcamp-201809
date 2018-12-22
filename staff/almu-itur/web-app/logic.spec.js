const logic = require('./logic')

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    describe('users', () => {
        describe('register', () => {
            it('should succeed on correct data', () => {
                const username = `jd-${Math.random()}`

                expect(() =>
                    logic.registerUser('John', 'Doe', username, '123')
                ).not.to.throw()
            })

            it('should fail on trying to register twice same user', () => {
                const username = `jd-${Math.random()}`

                logic.registerUser('John', 'Doe', username, '123')

                expect(() =>
                    logic.registerUser('John', 'Doe', username, '123')
                ).to.throw(Error, `username ${username} already registered`)
            })

            it('should fail on name different to string', () => {
                const name = undefined
                expect(() =>
                    logic.registerUser(name, 'Doe', 'jd', '123')
                ).to.throw(TypeError, `${name} is not a string`)
            })

            it('should fail on surname different to string', () => {
                const surname = undefined
                expect(() =>
                    logic.registerUser('John', surname, 'jd', '123')
                ).to.throw(TypeError, `${surname} is not a string`)
            })

            it('should fail on username different to string', () => {
                const username = undefined
                expect(() =>
                    logic.registerUser('John', 'Doe', username, '123')
                ).to.throw(TypeError, `${username} is not a string`)
            })

            it('should fail on password different to string', () => {
                const password = undefined
                expect(() =>
                    logic.registerUser('John', 'Doe', 'jd', password)
                ).to.throw(TypeError, `${password} is not a string`)
            })

            //BLANK
        })

        describe('login', () => {
            describe('with existing user', () => {
                let username, password

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                })

                it('should succeed on correct data', () =>
                    
                    expect(() =>
                        logic.login(username, password)
                    ).not.to.throw()
                )

                it('should fail on username different to string', () => {
                    const username = undefined
                    
                    expect(() =>
                        logic.login(username, password)
                    ).to.throw(TypeError, `${username} is not a string`)
                })
    
                it('should fail on password different to string', () => {
                    const password = undefined

                    expect(() =>
                        logic.login(username, password)
                    ).to.throw(TypeError, `${password} is not a string`)
                })

                //BLANK

            })
        })

        describe('loggedIn', () => { 
        })

        describe('logout', () => { 

        })



    })
})
