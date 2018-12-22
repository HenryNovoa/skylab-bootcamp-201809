//import logic from './logic'

require('isomorphic-fetch')

global.sessionStorage = require('sessionstorage')

const logic = require('./logic')

logic.url = 'http://localhost:5000/api'
// logic.url = 'http://192.168.0.82:5000' // DEV server!

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    describe('users', () => {
        !false && describe('register', () => {
            it('should succeed on correct data', () =>
                logic.registerUser('John', 'Doe', `jd-${Math.random()}`, '123')
                    .then(() => expect(true).to.be.true)
            )

            it('should fail on trying to register twice same user', () => {
                const username = `jd-${Math.random()}`

                return logic.registerUser('John', 'Doe', username, '123')
                    .then(() => logic.registerUser('John', 'Doe', username, '123'))
                    .catch(err => {
                        expect(err).not.to.be.undefined
                        expect(err.message).to.equal(`username ${username} already registered`)
                    })
            })

            it('should fail on undefined name', () => {
                expect(() =>
                    logic.registerUser(undefined, 'Doe', 'jd', '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other cases
        })

        !false && describe('login', () => {
            describe('with existing user', () => {
                let username, password

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                })

                it('should succeed on correct data', () =>
                    logic.login(username, password)
                        .then(() => expect(true).to.be.true)
                )

                it('should fail on wrong username', () => {
                    username = `dummy-${Math.random()}`

                    return logic.login(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal(`invalid username or password`)
                        })
                })

                it('should fail on wrong password', () => {
                    password = 'pepito'

                    return logic.login(username, password)
                        .catch(err => {
                            expect(err).not.to.be.undefined
                            expect(err.message).to.equal('invalid username or password')
                        })
                })
            })

            it('should fail on undefined username', () => {
                const username = undefined

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on boolean username', () => {
                const username = true

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            it('should fail on numeric username', () => {
                const username = 123

                expect(() =>
                    logic.login(username, '123')
                ).to.throw(Error, `${username} is not a string`)
            })

            // TODO other cases
        })

        !false && describe('update profile', () => {
            describe('with existing user', () => {
                let username, password, name, surname, username2, password2

                beforeEach(() => {
                    name = 'John'
                    surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                        .then(() => {
                            return logic.login(username, password)
                        })

                })

                it('should succeed on correct data', () =>
                    logic.modifyProfile("manolo", "escobar", `usernamejd-${Math.random()}`, password, password, password)
                        .then(() => expect(true).to.be.true)
                )

                it('should fail on existing username', () => {

                    username2 = `jd-${Math.random()}`
                    password2 = `123-${Math.random()}`

                    return logic.registerUser(name, surname, username2, password2)
                        .then(() => {
                            return logic.login(username, password)
                                .then(() => {
                                    return logic.modifyProfile(name, surname, username2, password, password, password)
                                        .catch(err => {
                                            expect(err).not.to.be.undefined
                                            expect(err.message).to.equal(`username ${username2} already exists`)
                                        })
                                })
                        })
                })

                it('should fail on wrong password', () => {

                    username2 = `jd-${Math.random()}`
                    password2 = `123-${Math.random()}`

                    return logic.registerUser(name, surname, username2, password2)
                        .then(() => {
                            return logic.login(username, password)
                                .then(() => {
                                    return logic.modifyProfile(name, surname, username2, password, password, "no-password")
                                        .catch(err => {
                                            expect(err).not.to.be.undefined
                                            expect(err.message).to.equal(`invalid password`)
                                        })
                                })
                        })
                })

                it('should succed on undefined username', () => {

                    return logic.login(username, password)
                        .then(() => {
                            return logic.modifyProfile(name, surname, undefined, password, password, password)
                                .then(() => expect(true).to.be.true)
                        })
                })

                it('should fail on boolean username', () => {

                    return logic.login(username, password)
                        .then(() => {
                            return logic.modifyProfile(name, surname, undefined, password, password, password)
                                .catch(err => {
                                    expect(err).not.to.be.undefined
                                    expect(err.message).to.equal(`${undefined} is not a string`)
                                })
                        })
                })

                it('should fail on numeric username', () => {
                    return logic.login(username, password)
                        .then(() => {
                            return logic.modifyProfile(name, surname, 123, password, password, password)
                                .catch(err => {
                                    expect(err).not.to.be.undefined
                                    expect(err.message).to.equal(`${123} is not a string`)
                                })
                        })
                })

                // TODO other cases
            })
        })
    })

    describe('postits', () => {
        !false && describe('add', () => {
            describe('with existing user', () => {
                let username, password, text

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    text = `hello ${Math.random()}`

                    return logic.registerUser(name, surname, username, password)
                        .then(() => logic.login(username, password))
                })

                it('should succeed on correct data', () =>
                    logic.addPostit(text)
                        .then(() => expect(true).to.be.true)
                )
            })
        })

        !false && describe('list', () => {
            !false && describe('with existing user', () => {
                let username, password, text

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    text = `hello ${Math.random()}`
                    status = `DONE`

                    return logic.registerUser(name, surname, username, password)
                        .then(() => logic.login(username, password))
                })

                describe('with existing postit', () => {
                    beforeEach(() => logic.addPostit(text, status))

                    it('should return postits', () =>
                        logic.listPostits()
                            .then(postits => {
                                expect(postits).not.to.be.undefined
                                expect(postits.length).to.equal(1)
                            })
                    )
                })

                it('should return no postits', () =>
                    logic.listPostits()
                        .then(postits => {
                            expect(postits).not.to.be.undefined
                            expect(postits.length).to.equal(0)
                        })
                )
            })
        })

        !false && describe('remove', () => {
            describe('with existing user', () => {
                let username, password, text, postitId

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    text = `hello ${Math.random()}`
                    status= 'DONE'

                    return logic.registerUser(name, surname, username, password)
                        .then(() => logic.login(username, password))
                })

                describe('with existing postit', () => {
                    beforeEach(() =>
                        logic.addPostit(text, status)
                            .then(() => logic.listPostits())
                            .then(postits => postitId = postits[0].id)
                    )

                    it('should succeed', () =>
                        logic.removePostit(postitId)
                            .then(() => expect(true).to.be.true)
                    )
                })
            })
        })

        !false && describe('modify', () => {
            describe('with existing user', () => {
                let username, password, text, postitId

                beforeEach(() => {
                    const name = 'John', surname = 'Doe'

                    username = `jd-${Math.random()}`
                    password = `123-${Math.random()}`

                    text = `hello ${Math.random()}`
                    status='DONE'

                    return logic.registerUser(name, surname, username, password)
                        .then(() => logic.login(username, password))
                })

                describe('with existing postit', () => {
                    let newText

                    beforeEach(() => {
                        newText = `hello ${Math.random()}`

                        return logic.addPostit(text, status)
                            .then(() => logic.listPostits())
                            .then(([postit]) => postitId = postit.id)
                    })

                    it('should succeed', () =>
                        logic.modifyPostit(postitId, newText, status)
                            .then(() => {
                                expect(true).to.be.true

                                return logic.listPostits()
                            })
                            .then(postits => {
                                expect(postits).not.to.be.undefined
                                expect(postits.length).to.equal(1)

                                const [postit] = postits

                                expect(postit.id).to.equal(postitId)
                                expect(postit.text).to.equal(newText)
                            })
                    )
                })
            })
        })
    })
})