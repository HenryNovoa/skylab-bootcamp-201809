require('dotenv').config()
const { User, Postit } = require('../data')
const logic = require('.')
const { AlreadyExistsError } = require('../errors')

const { expect } = require('chai')

const { env: { MONGO_URL } } = process

const mongoose = require('mongoose')




// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {


    before(() => mongoose.connect(MONGO_URL + '/postit-test', { useNewUrlParser: true }))

    beforeEach(() => Promise.all([User.deleteMany(), Postit.deleteMany()]))

    describe('user', () => {
        describe('register', () => {
            let name, surname, username, password

            beforeEach(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                username = `username-${Math.random()}`
                password = `password-${Math.random()}`
            })

            it('should succeed on correct data', async () => {
                const res = await logic.registerUser(name, surname, username, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                expect(_users.length).to.equal(1)

                const [user] = _users

                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
            })

            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        describe('authenticate', () => {
            let user

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                return User.create(user)
            })

            it('should authenticate on correct credentials', async () => {
                //asnyc - await

                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                let users = await User.find()

                const [_user] = users

                expect(_user.id).to.equal(id)

                //Promises
                // return logic.authenticateUser(username, password)
                //     .then(id => {
                //         expect(id).to.exist
                //         expect(id).to.be.a('string')

                //         return User.find()
                //             .then(_users => {
                //                 const [_user] = _users

                //                 expect(_user.id).to.equal(id)
                //             })
                //     })
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        describe('retrieve', () => {
            let user, postit

            beforeEach(() => {

                postit = new Postit({ text: `hello-${Math.random()}`, status: 'TODO' })
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123', postits: [postit] })

                return user.save(user)
            })

            it('should succeed on valid id', async () => {

                //async-await
                const _user = await logic.retrieveUser(user.id)
                expect(_user).not.to.be.instanceof(User)

                const { name, surname, username, password, postits } = _user


                expect(_user.id).to.exist
                expect(_user.id).to.equal(user.id)
                expect(name).to.equal(user.name)
                expect(surname).to.equal(user.surname)
                expect(username).to.equal(user.username)
                expect(password).to.be.undefined
                expect(postits).not.to.exist


                //Promises
                // logic.retrieveUser(user.id)
                // .then(_user => {
                //     expect(_user).not.to.be.instanceof(User)

                //     const {name, surname, username, password, postits } = _user


                //     expect(_user.id).to.exist
                //     expect(_user.id).to.equal(user.id)
                //     expect(name).to.equal(user.name)
                //     expect(surname).to.equal(user.surname)
                //     expect(username).to.equal(user.username)
                //     expect(password).to.be.undefined
                //     expect(postits).not.to.exist
                // })
            })


        })

        describe('update', () => {
            let user

            beforeEach(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })).save())

            it('should update on correct data and password', async () => {
                const { id, name, surname, username, password } = user

                const newName = `${name}-${Math.random()}`
                const newSurname = `${surname}-${Math.random()}`
                const newUsername = `${username}-${Math.random()}`
                const newPassword = `${password}-${Math.random()}`


                //async-await
                await logic.updateUser(id, newName, newSurname, newUsername, newPassword, password)
                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)


                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(newUsername)
                expect(_user.password).to.equal(newPassword)

                //Promises
                // return logic.updateUser(id, newName, newSurname, newUsername, newPassword, password)
                //     .then(() => User.find())
                //     .then(_users => {
                //         const [_user] = _users

                //         expect(_user.id).to.equal(id)

                //         const { name, surname, username, password } = _user

                //         expect(name).to.equal(newName)
                //         expect(surname).to.equal(newSurname)
                //         expect(username).to.equal(newUsername)
                //         expect(password).to.equal(newPassword)
                //     })
            })

            it('should update on correct id, name and password (other fields null)', async () => {
                const { id, name, surname, username, password } = user

                const newName = `${name}-${Math.random()}`
                //async-await
                await logic.updateUser(id, newName, null, null, null, password)
                _users = await User.find()
                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(surname)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)

                //Promises
                // return logic.updateUser(id, newName, null, null, null, password)
                //     .then(() => User.find())
                //     .then(_users => {
                //         const [_user] = _users

                //         expect(_user.id).to.equal(id)

                //         expect(_user.name).to.equal(newName)
                //         expect(_user.surname).to.equal(surname)
                //         expect(_user.username).to.equal(username)
                //         expect(_user.password).to.equal(password)
                //     })
            })

            it('should update on correct id, surname and password (other fields null)', async () => {
                const { id, name, surname, username, password } = user

                const newSurname = `${surname}-${Math.random()}`
                //async-await
                await logic.updateUser(id, null, newSurname, null, null, password)
                _users = await User.find()
                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
                //Promises
                // return logic.updateUser(id, null, newSurname, null, null, password)
                //     .then(() => User.find())
                //     .then(_users => {
                //         const [_user] = _users

                //         expect(_user.id).to.equal(id)

                //         expect(_user.name).to.equal(name)
                //         expect(_user.surname).to.equal(newSurname)
                //         expect(_user.username).to.equal(username)
                //         expect(_user.password).to.equal(password)
                //     })
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, name, surname, username, password } = user

                expect(() => logic.updateUser(undefined, name, surname, username, password, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases

            describe('with existing user', () => {
                let user2

                beforeEach(() => {
                    user2 = new User({ name: 'John', surname: 'Doe', username: 'jd2', password: '123' })

                    return user2.save()
                })

                it('should fail on trying to modify already existing username', async () => {
                    const { id, name, surname, username, password } = user2

                    const newUsername = 'jd'

                    //async-await
                    try {
                        await logic.updateUser(id, null, null, newUsername, null, password)

                        expect(true).to.be.false

                    } catch (err) {
                        expect(err).to.be.instanceof(AlreadyExistsError)

                        _user = await User.findById(id)

                        expect(_user.id).to.equal(id)

                        expect(_user.name).to.equal(name)

                        expect(_user.surname).to.equal(surname)

                        expect(_user.username).to.equal(username)

                        expect(_user.password).to.equal(password)
                    }

                    //promises
                    // return logic.updateUser(id, null, null, newUsername, null, password)
                    //     .then(() => expect(true).to.be.false)
                    //     .catch(err => {
                    //         expect(err).to.be.instanceof(AlreadyExistsError)

                    //         return User.findById(id)
                    //     })
                    //     .then(_user => {
                    //         expect(_user.id).to.equal(id)

                    //         expect(_user.name).to.equal(name)
                    //         expect(_user.surname).to.equal(surname)
                    //         expect(_user.username).to.equal(username)
                    //         expect(_user.password).to.equal(password)
                    //     })
                })
            })
        })
    })



    // TODO other test cases


    describe('postits', () => {

        describe('add', () => {
            let user, text

            beforeEach(() => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                text = `text-${Math.random()}`

                //return User.create(user)
                // ALT
                return user.save()
            })
            it('should succeed on correct data', async () => {

                //async-await
                await logic.addPostit(user.id, text)

                postits = await Postit.find()

                const [postit] = postits

                expect(postit.text).to.equal(text)

                expect(postit.user.toString()).to.equal(user.id)
                //Promises
                // return logic.addPostit(user.id, text)
                //     .then(() => Postit.find())
                //     .then(postits => {
                //         const [postit] = postits

                //         expect(postit.text).to.equal(text)

                //         expect(postit.user.toString()).to.equal(user.id)
                //     })
            })


            // TODO other test cases
        })

        describe('list', () => {
            let user, postit, postit2

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                postit = new Postit({ text: 'hello text', user: user.id, status: 'TODO' })
                postit2 = new Postit({ text: 'hello text 2', user: user.id, status: 'TODO' })

                await user.save()
                await postit.save()
                await postit2.save()
                //Promises
                //user.save()
                // .then(() => Promise.all([postit.save(), postit2.save()])) // RISKY the order of saving is not warranted
                // .then(() => postit.save())
                // .then(() => postit2.save())
            })

            it('should succeed on correct data', async () => {

                //async-await
                postits = await logic.listPostits(user.id)
                _postits = await Postit.find()
                expect(_postits.length).to.equal(2)

                expect(postits.length).to.equal(_postits.length)

                const [_postit, _postit2] = _postits

                expect(_postit.id).to.equal(postit.id)
                expect(_postit.text).to.equal(postit.text)

                expect(_postit2.id).to.equal(postit2.id)
                expect(_postit2.text).to.equal(postit2.text)

                const [__postit, __postit2] = postits

                expect(__postit).not.to.be.instanceof(Postit)
                expect(__postit2).not.to.be.instanceof(Postit)

                expect(_postit.id).to.equal(__postit.id)
                expect(_postit.text).to.equal(__postit.text)

                expect(_postit2.id).to.equal(__postit2.id)
                expect(_postit2.text).to.equal(__postit2.text)


                //Promises
                // return logic.listPostits(user.id)
                //     .then(postits => {
                //         return Postit.find()
                //             .then(_postits => {
                //                 expect(_postits.length).to.equal(2)

                //                 expect(postits.length).to.equal(_postits.length)

                //                 const [_postit, _postit2] = _postits

                //                 expect(_postit.id).to.equal(postit.id)
                //                 expect(_postit.text).to.equal(postit.text)

                //                 expect(_postit2.id).to.equal(postit2.id)
                //                 expect(_postit2.text).to.equal(postit2.text)

                //                 const [__postit, __postit2] = postits

                //                 expect(__postit).not.to.be.instanceof(Postit)
                //                 expect(__postit2).not.to.be.instanceof(Postit)

                //                 expect(_postit.id).to.equal(__postit.id)
                //                 expect(_postit.text).to.equal(__postit.text)

                //                 expect(_postit2.id).to.equal(__postit2.id)
                //                 expect(_postit2.text).to.equal(__postit2.text)
                //             })
                //     })
            })
        })

        describe('remove', () => {
            let user, postit

            beforeEach(async () => {

                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                postit = new Postit({ text: 'hello text', status: 'todo', user: user.id, status: 'DONE' })

                await user.save()
                await postit.save()
            })

            it('should succeed on correct data', async () => {

                //async-await
                await logic.removePostit(postit.id)
                let postits = await Postit.find()
                expect(postits.length).to.equal(0)
                //promises
                //     logic.removePostit(postit.id)
                //     .then(() => Postit.find())
                //     .then(postits => {
                //         expect(postits.length).to.equal(0)

                //     })
                // })
            })
        })

        describe('modify', () => {
            let user, postit, newText

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                postit = new Postit({ text: 'hello text', status: 'todo', user: user.id })

                newText = `new-text-${Math.random()}`
                newStatus = 'done'

                await user.save()
                await postit.save()
                //promises
                // return user.save()
                //     .then(() => postit.save())
            })

            it('should succeed on correct data', async () => {


                //async-await
                await logic.modifyPostit(user.id, postit.id, newText)
                let postits = await Postit.find()
                expect(postits.length).to.equal(1)

                const [_postit] = postits

                expect(_postit.id).to.equal(postit.id)

                expect(_postit.text).to.equal(newText)

                //promises
                //return  logic.modifyPostit(user.id, postit.id, newText)
                //         .then(() => Postit.find())
                //         .then(postits => {
                //             expect(postits.length).to.equal(1)

                //             const [_postit] = postits

                //             expect(_postit.id).to.equal(postit.id)

                //             expect(_postit.text).to.equal(newText)

                //         })
            })
        })
    })

    describe('status', async () => {
        let user, postit, newStatus

        beforeEach(async () => {
            user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

            postit = new Postit({ text: 'hello text', status: 'todo', user: user.id })


            newStatus = 'DONE'
            //async-await
            await user.save()
            await postit.save()
            //promises
            // return user.save()
            //     .then(() => postit.save())
        })

        it('should succeed on correct data', async () => {

            await logic.updateStatus(postit.id, newStatus)
            let postits = await Postit.find()
            expect(postits.length).to.equal(1)

            const [_postit] = postits

            expect(_postit.id).to.equal(postit.id)

            expect(_postit.status).to.equal(newStatus)




            //promises
            // return logic.updateStatus(postit.id, newStatus)
            //     .then(() => Postit.find())
            //     .then(postits => {
            //         expect(postits.length).to.equal(1)

            //         const [_postit] = postits

            //         expect(_postit.id).to.equal(postit.id)

            //         expect(_postit.status).to.equal(newStatus)

            //     })
        })
    })

    describe('add buddies', async () => {
        let user, postit, newStatus

        beforeEach(async () => {
            user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
            user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })
            postit = new Postit({ text: 'hello text', status: 'todo', user: user.id })


            newStatus = 'DONE'
            //async-await
            await user.save()
            await user2.save()
            await postit.save()

            //promises
            // return user.save()
            //     .then(() => postit.save())
        })

        it('should succeed on adding buddy', async () => {

            await logic.addBuddy(user.id, user2.username)
            let _user = await User.findById(user.id)

            expect(_user.buddies).to.exist
            expect(_user.buddies.length).to.equal(1)

            expect(_user.buddies[0].toString()).to.equal(user2.id)
        })
    })

    describe('list buddies', async () => {
        let user, postit

        beforeEach(async () => {
            user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
            user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })
            postit = new Postit({ text: 'hello text', status: 'todo', user: user.id })


            newStatus = 'DONE'
            //async-await
            await user.save()
            await user2.save()
            await postit.save()

            //promises
            // return user.save()
            //     .then(() => postit.save())
        })

        it('should succeed on listing added buddy', async () => {

            await logic.addBuddy(user.id, user2.username)
            let _user = await User.findById(user.id)

            expect(_user.buddies).to.exist
            expect(_user.buddies.length).to.equal(1)

            expect(_user.buddies[0].toString()).to.equal(user2.id)


            let buddies = await logic.listBuddies(user.id)

            expect(buddies).to.exist

            expect(buddies.length).to.equal(1)

            expect(_user.buddies[0].toString()).to.equal(user2.id)
        })
    })
  
  
  
   
    describe('assign to', async () => {
        let user, postit

        beforeEach(async () => {
            user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
            user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })
            postit = new Postit({ text: 'hello text', status: 'todo', user: user.id })


            newStatus = 'DONE'
            //async-await
            await user.save()
            await user2.save()
            await postit.save()

        })

        it('should succeed on assinging postit on created postit', async () => {

            await logic.addBuddy(user.id, user2.username)
            let _user = await User.findById(user.id)

            expect(_user.buddies).to.exist
            expect(_user.buddies.length).to.equal(1)

            expect(_user.buddies[0]._id.toString()).to.equal(user2.id.toString())


            await logic.assignTo(postit.id, user2.id)

            let _postit = await Postit.findById(postit.id)
            debugger
            expect(_postit).to.exist
            expect(_postit.assignedTo._id.toString()).to.equal(user2.id)


        })
    })


    after(() => mongoose.disconnect())
})