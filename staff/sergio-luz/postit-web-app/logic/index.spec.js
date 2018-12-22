const fs = require('fs')
const { User, Postit } = require('../data')
const logic = require('.')

const { expect } = require('chai')

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    before(() => {
        User._file = './data/users.spec.json'
    })

    beforeEach(() => fs.writeFileSync(User._file, JSON.stringify([])))

    afterEach(() => fs.writeFileSync(User._file, JSON.stringify([])))

    describe('user', () => {
        describe('register', () => {
            let name, surname, username, password

            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', () =>
                logic.registerUser(name, surname, username, password)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        const [user] = users

                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.username).to.equal(username)
                        expect(user.password).to.equal(password)
                    })
            )

            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })


            it('should fail on null name', () => {
                expect(() =>
                    logic.registerUser(null, 'Doe', 'jd', '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object name', () => {
                expect(() =>
                    logic.registerUser({}, 'Doe', 'jd', '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty name', () => {
                expect(() =>
                    logic.registerUser('      ', 'Doe', 'jd', '123')
                ).to.throw(Error, 'name is empty or blank')
            })

            it('should fail on undefined surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', undefined, 'jd', '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', null, 'jd', '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', {}, 'jd', '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty surname', () => {
                expect(() =>
                    logic.registerUser('Jhon', '      ', 'jd', '123')
                ).to.throw(Error, 'surname is empty or blank')
            })

            it('should fail on undefined username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', undefined, '123')
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', null, '123')
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', {}, '123')
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty username', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', '      ', '123')
                ).to.throw(Error, 'username is empty or blank')
            })

            it('should fail on undefined password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', undefined)
                ).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on null password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', null)
                ).to.throw(TypeError, 'null is not a string')
            })

            it('should fail on object password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', {})
                ).to.throw(TypeError, '[object Object] is not a string')
            })

            it('should fail on empty password', () => {
                expect(() =>
                    logic.registerUser('Jhon', 'Doe', 'jd', '      ')
                ).to.throw(Error, 'password is empty or blank')
            })
        })

        describe('authenticate', () => {
            let user

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should authenticate on correct credentials', () => {
                const { username, password } = user

                return logic.authenticateUser(username, password)
                    .then(id => {
                        expect(id).to.exist
                        expect(id).to.be.a('number')

                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        const [_user] = users

                        expect(_user.id).to.equal(id)
                    }).catch(err => err)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on boolean username', () => {
                const username = true

                expect(() =>
                    logic.authenticateUser(username, '123')
                ).to.throw(TypeError, `${username} is not a string`)
            })

            it('should fail on numeric username', () => {
                const username = 123

                expect(() =>
                    logic.authenticateUser(username, '123')
                ).to.throw(TypeError, `${username} is not a string`)
            })

            it('should fail on object username', () => {
                const username = {}

                expect(() =>
                    logic.authenticateUser(username, '123')
                ).to.throw(Error, `[object Object] is not a string`)
            })

            it('should fail on undefined password', () => {
                const password = undefined

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on boolean password', () => {
                const password = true

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on numeric password', () => {
                const password = 123

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `${password} is not a string`)
            })

            it('should fail on object password', () => {
                const password = {}

                expect(() =>
                    logic.authenticateUser('Jhon', password)
                ).to.throw(Error, `[object Object] is not a string`)
            })
        })

        describe('retrieve', () => {
            let user, postit

            beforeEach(() => {
                postit = new Postit('hello text')
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should succeed on valid id', () =>
                logic.retrieveUser(user.id)
                    .then(_user => {
                        expect(_user).not.to.be.instanceof(User)

                        const { id, name, surname, username, password, postits } = _user

                        expect(id).to.exist
                        expect(id).to.equal(user.id)
                        expect(name).to.equal(user.name)
                        expect(surname).to.equal(user.surname)
                        expect(username).to.equal(user.username)
                        expect(password).to.be.undefined
                        expect(postits).to.exist
                        expect(postits.length).to.equal(1)

                        const [_postit] = postits

                        expect(_postit.id).to.equal(postit.id)
                        expect(_postit.text).to.equal(postit.text)
                    })
            )

            it('should fail on undefined id', () => {
                expect(() => {
                    logic.retrieveUser(undefined)
                }).to.throw(TypeError, 'undefined is not a number')
            })

            it('should fail on boolean id', () => {
                const id = true

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail on string id', () => {
                const id = '123'

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail on object id', () => {
                const id = {}

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(Error, `[object Object] is not a number`)
            })

            it('should fail when array id', () => {
                const id = new Array()

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when null id', () => {
                const id = null

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when empty id', () => {
                const id = ''

                expect(() =>
                    logic.retrieveUser(id)
                ).to.throw(TypeError, `${id} is not a number`)
            })
        })
    })

    describe('postits', () => {
        describe('add', () => {
            let user, text

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                fs.writeFileSync(User._file, JSON.stringify([user]))

                text = `text-${Math.random()}`
            })

            it('should succeed on correct data', () =>
                logic.addPostit(user.id, text)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        expect(users.length).to.equal(1)

                        const [_user] = users

                        expect(_user.id).to.equal(user.id)

                        const { postits } = _user

                        expect(postits.length).to.equal(1)

                        const [postit] = postits

                        expect(postit.text).to.equal(text)
                    })
            )

            it('should fail when string id', () => {
                const id = 'string'

                expect(() =>
                    logic.addPostit(id, text)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when undefined id', () => {
                const id = undefined

                expect(() =>
                    logic.addPostit(id, text)
                ).to.throw(TypeError, `${id} is not a number`)
            })
            it('should fail when boolean id', () => {
                const id = true

                expect(() =>
                    logic.addPostit(id, text)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when object id', () => {
                const id = new Object()

                expect(() =>
                    logic.addPostit(id, text)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when array id', () => {
                const id = new Array()

                expect(() =>
                    logic.addPostit(id, text)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when null id', () => {
                const id = null

                expect(() =>
                    logic.addPostit(id, text)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when empty id', () => {
                const id = ''

                expect(() =>
                    logic.addPostit(id, text)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            //-------------------------------------------------

            it('should fail when numeric text', () => {
                const text = 123

                expect(() =>
                    logic.addPostit(user.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when undefined text', () => {
                const text = undefined

                expect(() =>
                    logic.addPostit(user.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })
            it('should fail when boolean text', () => {
                const text = true

                expect(() =>
                    logic.addPostit(user.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when object text', () => {
                const text = new Object()

                expect(() =>
                    logic.addPostit(user.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when array text', () => {
                const text = new Array()

                expect(() =>
                    logic.addPostit(user.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when null text', () => {
                const text = null

                expect(() =>
                    logic.addPostit(user.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when empty text', () => {
                const text = '         '

                expect(() =>
                    logic.addPostit(user.id, text)
                ).to.throw(Error, `text is empty or blank`)
            })
        })

        describe('remove', () => {
            let user, postit

            beforeEach(() => {
                postit = new Postit('hello text')
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should succeed on correct data', () =>
                logic.removePostit(user.id, postit.id)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        expect(users.length).to.equal(1)

                        const [_user] = users

                        expect(_user.id).to.equal(user.id)

                        const { postits } = _user

                        expect(postits.length).to.equal(0)
                    })
            )

            it('should fail when string id', () => {
                const id = 'string'

                expect(() =>
                    logic.removePostit(id, postit.id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when undefined id', () => {
                const id = undefined

                expect(() =>
                    logic.removePostit(id, postit.id)
                ).to.throw(TypeError, `${id} is not a number`)
            })
            it('should fail when boolean id', () => {
                const id = true

                expect(() =>
                    logic.removePostit(id, postit.id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when object id', () => {
                const id = new Object()

                expect(() =>
                    logic.removePostit(id, postit.id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when array id', () => {
                const id = new Array()

                expect(() =>
                    logic.removePostit(id, postit.id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when null id', () => {
                const id = null

                expect(() =>
                    logic.removePostit(id, postit.id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when empty id', () => {
                const id = ''

                expect(() =>
                    logic.removePostit(id, postit.id)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            //-------------------------------------------------

            it('should fail when string postit id', () => {
                const postitId = 'string'

                expect(() =>
                    logic.removePostit(user.id, postitId)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when undefined postit id', () => {
                const postitId = undefined

                expect(() =>
                    logic.removePostit(user.id, postitId)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })
            it('should fail when boolean postit id', () => {
                const postitId = true

                expect(() =>
                    logic.removePostit(user.id, postitId)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when object postit id', () => {
                const postitId = new Object()

                expect(() =>
                    logic.removePostit(user.id, postitId)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when array postit id', () => {
                const postitId = new Array()

                expect(() =>
                    logic.removePostit(user.id, postitId)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when null postit id', () => {
                const postitId = null

                expect(() =>
                    logic.removePostit(user.id, postitId)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when empty postit id', () => {
                const postitId = ''

                expect(() =>
                    logic.removePostit(user.id, postitId)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })
        })

        describe('modify', () => {
            let user, postit, newText

            beforeEach(() => {
                postit = new Postit('hello text')
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                newText = `new-text-${Math.random()}`

                fs.writeFileSync(User._file, JSON.stringify([user]))
            })

            it('should succeed on correct data', () =>
                logic.modifyPostit(user.id, postit.id, newText)
                    .then(() => {
                        const json = fs.readFileSync(User._file)

                        const users = JSON.parse(json)

                        expect(users.length).to.equal(1)

                        const [_user] = users

                        expect(_user.id).to.equal(user.id)

                        const { postits } = _user

                        expect(postits.length).to.equal(1)

                        const [postit] = postits

                        expect(postit.text).to.equal(newText)
                    })
            )


            it('should fail when string id', () => {
                const id = 'string'

                expect(() =>
                    logic.modifyPostit(id, postit.id, newText)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when undefined id', () => {
                const id = undefined

                expect(() =>
                    logic.modifyPostit(id, postit.id, newText)
                ).to.throw(TypeError, `${id} is not a number`)
            })
            it('should fail when boolean id', () => {
                const id = true

                expect(() =>
                    logic.modifyPostit(id, postit.id, newText)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when object id', () => {
                const id = new Object()

                expect(() =>
                    logic.modifyPostit(id, postit.id, newText)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when array id', () => {
                const id = new Array()

                expect(() =>
                    logic.modifyPostit(id, postit.id, newText)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when null id', () => {
                const id = null

                expect(() =>
                    logic.modifyPostit(id, postit.id, newText)
                ).to.throw(TypeError, `${id} is not a number`)
            })

            it('should fail when empty id', () => {
                const id = ''

                expect(() =>
                    logic.modifyPostit(id, postit.id, newText)
                ).to.throw(TypeError, `${id} is not a number`)
            })
            
            //-------------------------------------------------

            it('should fail when string postit id', () => {
                const postitId = 'string'

                expect(() =>
                    logic.modifyPostit(user.id, postitId, newText)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when undefined postit id', () => {
                const postitId = undefined

                expect(() =>
                    logic.modifyPostit(user.id, postitId, newText)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })
            it('should fail when boolean postit id', () => {
                const postitId = true

                expect(() =>
                    logic.modifyPostit(user.id, postitId, newText)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when object postit id', () => {
                const postitId = new Object()

                expect(() =>
                    logic.modifyPostit(user.id, postitId, newText)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when array postit id', () => {
                const postitId = new Array()

                expect(() =>
                    logic.modifyPostit(user.id, postitId, newText)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when null postit id', () => {
                const postitId = null

                expect(() =>
                    logic.modifyPostit(user.id, postitId, newText)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            it('should fail when empty postit id', () => {
                const postitId = ''

                expect(() =>
                    logic.modifyPostit(user.id, postitId, newText)
                ).to.throw(TypeError, `${postitId} is not a number`)
            })

            //-------------------------------------------------

            it('should fail when numeric text', () => {
                const text = 123

                expect(() =>
                    logic.modifyPostit(user.id,postit.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when undefined text', () => {
                const text = undefined

                expect(() =>
                    logic.modifyPostit(user.id,postit.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })
            it('should fail when boolean text', () => {
                const text = true

                expect(() =>
                    logic.modifyPostit(user.id,postit.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when object text', () => {
                const text = new Object()

                expect(() =>
                    logic.modifyPostit(user.id,postit.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when array text', () => {
                const text = new Array()

                expect(() =>
                    logic.modifyPostit(user.id,postit.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when null text', () => {
                const text = null

                expect(() =>
                    logic.modifyPostit(user.id,postit.id, text)
                ).to.throw(TypeError, `${text} is not a string`)
            })

            it('should fail when empty text', () => {
                const text = '         '

                expect(() =>
                    logic.modifyPostit(user.id,postit.id, text)
                ).to.throw(Error, `text is empty or blank`)
            })

        })
    })

})