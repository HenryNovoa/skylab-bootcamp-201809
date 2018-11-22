const mongoose = require('mongoose')
const { User, Job, Comment } = require('../data')
const logic = require('.')
const { AlreadyExistsError, ValueError } = require('../errors')
const chunk = require('./chunk-test')
const fs = require('fs-extra')
const path = require('path')
const hasha = require('hasha')
const streamToArray = require('stream-to-array')
const text2png = require('text2png')

const { expect } = require('chai')

const MONGO_URL = 'mongodb://localhost:27017/handyman-test'

// running test from CLI
// normal -> $ mocha src/logic.spec.js --timeout 10000
// debug -> $ mocha debug src/logic.spec.js --timeout 10000

describe('logic', () => {
    before(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Job.deleteMany())


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

                const users = await User.find()

                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)
            })

            it('should fail on undefined name', () => {
                expect(() => logic.registerUser(undefined, surname, username, password)).to.throw(TypeError, 'undefined is not a string')
            })

            it('should fail on empty name', () => {
                expect(() => logic.registerUser('', surname, username, password)).to.throw(ValueError, 'name is empty or blank')
            })

            it('should fail on blank name', () => {
                expect(() => logic.registerUser('   \t\n', surname, username, password)).to.throw(ValueError, 'name is empty or blank')
            })

            // TODO other test cases
        })

        describe('authenticate', () => {
            let user

            // beforeEach(() => {
            //     user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

            //     return user.save()
            // })

            // ALT
            beforeEach(() => (user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })).save())

            it('should authenticate on correct credentials', async () => {
                const { username, password } = user

                const id = await logic.authenticateUser(username, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                const users = await User.find()

                const [_user] = users

                expect(_user.id).to.equal(id)
            })

            it('should fail on undefined username', () => {
                expect(() => logic.authenticateUser(undefined, user.password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases
        })

        describe('retrieve', () => {
            let user

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                await user.save()
            })

            it('should succeed on valid id', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user).not.to.be.instanceof(User)

                const { id, name, surname, username, password, jobs } = _user

                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(user.id)
                expect(name).to.equal(user.name)
                expect(surname).to.equal(user.surname)
                expect(username).to.equal(user.username)
                expect(password).to.be.undefined
                expect(jobs).not.to.exist
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

                const res = await logic.updateUser(id, newName, newSurname, newUsername, newPassword, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(newUsername)
                expect(_user.password).to.equal(newPassword)
            })

            it('should update on correct id, name and password (other fields null)', async () => {
                const { id, name, surname, username, password } = user

                const newName = `${name}-${Math.random()}`

                const res = await logic.updateUser(id, newName, null, null, null, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(newName)
                expect(_user.surname).to.equal(surname)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
            })

            it('should update on correct id, surname and password (other fields null)', async () => {
                const { id, name, surname, username, password } = user

                const newSurname = `${surname}-${Math.random()}`

                const res = await logic.updateUser(id, null, newSurname, null, null, password)

                expect(res).to.be.undefined

                const _users = await User.find()

                const [_user] = _users

                expect(_user.id).to.equal(id)

                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(newSurname)
                expect(_user.username).to.equal(username)
                expect(_user.password).to.equal(password)
            })

            // TODO other combinations of valid updates

            it('should fail on undefined id', () => {
                const { id, name, surname, username, password } = user

                expect(() => logic.updateUser(undefined, name, surname, username, password, password)).to.throw(TypeError, 'undefined is not a string')
            })

            // TODO other test cases

            describe('with existing user', () => {
                let user2

                beforeEach(async () => {
                    user2 = new User({ name: 'John', surname: 'Doe', username: 'jd2', password: '123' })

                    await user2.save()
                })

                it('should update on correct data and password', async () => {
                    const { id, name, surname, username, password } = user2

                    const newUsername = 'jd'

                    try {
                        const res = await logic.updateUser(id, null, null, newUsername, null, password)

                        expect(true).to.be.false
                    } catch (err) {
                        expect(err).to.be.instanceof(AlreadyExistsError)
                    } finally {
                        const _user = await User.findById(id)

                        expect(_user.id).to.equal(id)

                        expect(_user.name).to.equal(name)
                        expect(_user.surname).to.equal(surname)
                        expect(_user.username).to.equal(username)
                        expect(_user.password).to.equal(password)
                    }
                })
            })
        })

    })

    describe('Jobs', () => {




        describe('add', () => {
            let user, pictures, budget, contact, description, location, tags

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                pictures = ['dummy1', 'dummy2']

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']


                await user.save()
            })

            it('should succeed on correct data', async () => {

                const userId = user.id

                const res = await logic.createJob({ userId, pictures, budget, contact, description, location, tags })

                expect(res).to.be.undefined

                const jobs = await Job.find()

                const [job] = jobs

                expect(job.description).to.equal(description)

                expect(job.budget).to.equal(budget)

                expect(job.contact).to.equal(contact)

                expect(job.location).to.equal(location)

                expect(job.tags).not.to.be.undefined

                expect(tags.length).to.equal(2)

                expect(job.pictures).not.to.be.undefined

                expect(pictures.length).to.equal(2)

                expect(job.user.toString()).to.equal(user.id)
            })

            // TODO other test cases
        })
        describe('add photo', () => {
            let user

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })

                pictures = []

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']


                job = new Job({ pictures, user: user.id, budget, contact, description, location, tags })


                await user.save()
                await job.save()
                await Promise.all([user.save(), user2.save(), job.save()])
            })
            it('should succed on correct data', async () => {

                debugger
                const res = await logic.insertPhotoToJob(user.id, job.id,chunk)

                expect(res).to.be.undefined

                const _job = await Job.findById(job.id)

                expect(_job.id).to.equal(job.id)

                expect(_job.pictures.length).to.equal(1)
                
                expect(_job.pictures[0].toString()).to.exist


            })

        })

    

        describe('rate Job', () => {
            let user, user2, job

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })

                pictures = ['dummy1', 'dummy2']

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']


                job = new Job({ pictures, user: user.id, budget, contact, description, location, tags })


                await user.save()
                await job.save()
                await Promise.all([user.save(), user2.save(), job.save()])
            })


            describe('with user requesting to do posted job', () => {

                beforeEach(async () => {

                    const res = await logic.requestJob(user2.id, job.id)

                    expect(res).to.be.undefined

                    const jobs = await Job.find()

                    expect(jobs.length).to.equal(1)

                    const [_job] = jobs

                    expect(_job.requestedBy[0].toString()).to.equal(user2.id)
                })



                describe('with user assigned', () => {

                    beforeEach(async () => {

                        const res = await logic.assignJob(user.id, user2.id, job.id)

                        expect(res).to.be.undefined

                        const jobs = await Job.find()

                        expect(jobs.length).to.equal(1)

                        const [_job] = jobs

                        expect(_job.id).to.equal(job.id)
                        expect(_job.user.toString()).to.equal(user.id)
                        expect(_job.assignedTo.toString()).to.equal(user2.id)
                    })

                    it('should correctly rate job', async () => {
                        const rating = 4

                        const ratingText = 'good job!!'
                        
                        const res = await logic.rateJob(user.id, user2.id, job.id, rating, ratingText)

                        expect(res).to.be.undefined

                        const jobs = await Job.find()

                        expect(jobs.length).to.equal(1)

                        const [_job] = jobs

                        expect(_job.id).to.equal(job.id)
                        expect(_job.user.toString()).to.equal(user.id)
                        expect(_job.assignedTo.toString()).to.equal(user2.id)

                        expect(_job.rating).to.exist
                        expect(_job.rating).to.equal(rating)
                        expect(_job.ratingText).to.equal(ratingText)


                    })


                })
            })
        })

        describe('list', () => {
            let user, job, job2

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                pictures = ['dummy1', 'dummy2']

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']



                job = new Job({ pictures, user: user.id, budget, contact, description, location, tags })
                job2 = new Job({ pictures, user: user.id, budget, contact, description, location, tags })



                await user.save()
                await job.save()
                await job2.save()
            })

            it('All jobs', async () => {
                const jobs = await logic.listAllJobs()

                const _jobs = await Job.find()

                expect(_jobs.length).to.equal(2)

                expect(jobs.length).to.equal(_jobs.length)

                const [_job, _job2] = _jobs

                expect(_job.id).to.equal(job.id)

                expect(_job.description).to.equal(job.description)

                expect(_job.budget).to.equal(job.budget)

                expect(_job.contact).to.equal(job.contact)

                expect(_job.location).to.equal(job.location)

                expect(_job.tags).not.to.be.undefined

                expect(_job.pictures).not.to.be.undefined


                expect(_job2.id).to.equal(job2.id)

                expect(_job2.description).to.equal(job2.description)

                expect(_job2.budget).to.equal(job2.budget)

                expect(_job2.contact).to.equal(job2.contact)

                expect(_job2.location).to.equal(job2.location)

                expect(_job2.tags).not.to.be.undefined

                expect(_job2.pictures).not.to.be.undefined


                const [__job, __job2] = jobs

                expect(__job).not.to.be.instanceof(Job)
                expect(__job2).not.to.be.instanceof(Job)

                expect(_job.id).to.equal(job.id)

                expect(_job.description).to.equal(job.description)

                expect(_job.budget).to.equal(job.budget)

                expect(_job.contact).to.equal(job.contact)

                expect(_job.location).to.equal(job.location)

                expect(_job.tags).not.to.be.undefined

                expect(_job.pictures).not.to.be.undefined


                expect(_job2.id).to.equal(job2.id)

                expect(_job2.description).to.equal(job2.description)

                expect(_job2.budget).to.equal(job2.budget)

                expect(_job2.contact).to.equal(job2.contact)

                expect(_job2.location).to.equal(job2.location)

                expect(_job2.tags).not.to.be.undefined

                expect(_job2.pictures).not.to.be.undefined
            })


            it('(One Job) should succeed on correct data', async () => {
                const jobs = await logic.listJobs(user.id)

                const _jobs = await Job.find()

                expect(_jobs.length).to.equal(2)

                expect(jobs.length).to.equal(_jobs.length)

                const [_job, _job2] = _jobs

                expect(_job.id).to.equal(job.id)

                expect(_job.description).to.equal(job.description)

                expect(_job.budget).to.equal(job.budget)

                expect(_job.contact).to.equal(job.contact)

                expect(_job.location).to.equal(job.location)

                expect(_job.tags).not.to.be.undefined

                expect(_job.pictures).not.to.be.undefined


                expect(_job2.id).to.equal(job2.id)

                expect(_job2.description).to.equal(job2.description)

                expect(_job2.budget).to.equal(job2.budget)

                expect(_job2.contact).to.equal(job2.contact)

                expect(_job2.location).to.equal(job2.location)

                expect(_job2.tags).not.to.be.undefined

                expect(_job2.pictures).not.to.be.undefined


                const [__job, __job2] = jobs

                expect(__job).not.to.be.instanceof(Job)
                expect(__job2).not.to.be.instanceof(Job)

                expect(_job.id).to.equal(job.id)

                expect(_job.description).to.equal(job.description)

                expect(_job.budget).to.equal(job.budget)

                expect(_job.contact).to.equal(job.contact)

                expect(_job.location).to.equal(job.location)

                expect(_job.tags).not.to.be.undefined

                expect(_job.pictures).not.to.be.undefined


                expect(_job2.id).to.equal(job2.id)

                expect(_job2.description).to.equal(job2.description)

                expect(_job2.budget).to.equal(job2.budget)

                expect(_job2.contact).to.equal(job2.contact)

                expect(_job2.location).to.equal(job2.location)

                expect(_job2.tags).not.to.be.undefined

                expect(_job2.pictures).not.to.be.undefined
            })

            it('(RequestedBy) should succeed on correct data', async () => {
                const jobs = await logic.listJobs(user.id)

                const _jobs = await Job.find()

                expect(_jobs.length).to.equal(2)

                expect(jobs.length).to.equal(_jobs.length)

                const [_job, _job2] = _jobs

                expect(_job.id).to.equal(job.id)

                expect(_job.description).to.equal(job.description)

                expect(_job.budget).to.equal(job.budget)

                expect(_job.contact).to.equal(job.contact)

                expect(_job.location).to.equal(job.location)

                expect(_job.tags).not.to.be.undefined

                expect(_job.pictures).not.to.be.undefined


                expect(_job2.id).to.equal(job2.id)

                expect(_job2.description).to.equal(job2.description)

                expect(_job2.budget).to.equal(job2.budget)

                expect(_job2.contact).to.equal(job2.contact)

                expect(_job2.location).to.equal(job2.location)

                expect(_job2.tags).not.to.be.undefined

                expect(_job2.pictures).not.to.be.undefined


                const [__job, __job2] = jobs

                expect(__job).not.to.be.instanceof(Job)
                expect(__job2).not.to.be.instanceof(Job)

                expect(_job.id).to.equal(job.id)

                expect(_job.description).to.equal(job.description)

                expect(_job.budget).to.equal(job.budget)

                expect(_job.contact).to.equal(job.contact)

                expect(_job.location).to.equal(job.location)

                expect(_job.tags).not.to.be.undefined

                expect(_job.pictures).not.to.be.undefined


                expect(_job2.id).to.equal(job2.id)

                expect(_job2.description).to.equal(job2.description)

                expect(_job2.budget).to.equal(job2.budget)

                expect(_job2.contact).to.equal(job2.contact)

                expect(_job2.location).to.equal(job2.location)

                expect(_job2.tags).not.to.be.undefined

                expect(_job2.pictures).not.to.be.undefined
            })


            false && describe('when user has postit assigned', () => {
                let user2, postit3

                beforeEach(async () => {
                    user2 = new User({ name: 'Pepe', surname: 'Grillo', username: 'pg', password: '123' })

                    postit3 = new Postit({ text: 'hello text 3', user: user2.id, assignedTo: user.id })

                    await user2.save()
                    await postit3.save()
                })

                false & it('should succeed on correct data', async () => {
                    const postits = await logic.listPostits(user.id)

                    expect(postits.length).to.equal(3)

                    postits.forEach(_postit => {
                        if (_postit.id === postit.id) {
                            expect(_postit.text).to.equal(postit.text)
                        } else if (_postit.id === postit2.id) {
                            expect(_postit.text).to.equal(postit2.text)
                        } else if (_postit.id === postit3.id) {
                            expect(_postit.text).to.equal(postit3.text)

                            expect(_postit.assignedTo).to.equal(user.id)
                        } else {
                            throw Error('postit does not match any of the expected ones')
                        }
                    })
                })
            })
        })

        describe('remove', () => {
            let user, job

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })

                pictures = ['dummy1', 'dummy2']

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']



                job = new Job({ pictures, user: user.id, budget, contact, description, location, tags })


                await user.save()
                await job.save()
                await Promise.all([user.save(), job.save()])
            })

            it('should succeed on correct data', async () => {
                const res = await logic.removeJob(user.id, job.id)

                expect(res).to.be.undefined

                const jobs = await Job.find()

                expect(jobs.length).to.equal(0)
            })
        })

        describe('modify', () => {
            let user, job, newBudget, newContact, newDescription, newLocation, newTags, status, rating, assignedTo, requestedBy

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })

                pictures = ['dummy1', 'dummy2']

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']

                //Modifiers
                newBudget = `30.${Math.random()}`
                newContact = `123-${Math.random()}@456.com`
                newDescription = `chao mondo-${Math.random()}`
                newLocation = `madrid`
                status = 'DOING'
                rating = '4'
                assignedTo = user2.id
                newTags = ['bici', 'vehiculo', 'reudas']





                job = new Job({ pictures, user: user.id, budget, contact, description, location, tags, requestedBy: user2.id })


                await user.save()
                await job.save()
                await Promise.all([user.save(), user2.save(), job.save()])


            })

            it('should succeed on correct data', async () => {
                const userId = user.id
                const jobId = job.id
                newBudget = `30.${Math.random()}`
                newContact = `123-${Math.random()}@456.com`
                newDescription = `chao mondo-${Math.random()}`
                newLocation = `madrid`
                newStatus = 'DOING'
                newRating = '4'
                assignedTo = user2.id
                newTags = ['bici', 'vehiculo', 'rueda']

                const res = await logic.modifyJob({ userId, jobId, newBudget, newContact, newDescription, newLocation, newStatus, newRating, assignedTo, newTags })

                expect(res).to.be.undefined

                const jobs = await Job.find()

                expect(jobs.length).to.equal(1)

                const [_job] = jobs

                expect(_job.id).to.equal(jobId)
                expect(_job.user.toString()).to.equal(userId)
                expect(_job.budget).to.equal(newBudget)
                expect(_job.contact).to.equal(newContact)
                expect(_job.description).to.equal(newDescription)
                expect(_job.status).to.equal(newStatus)
                //expect(_job.rating).to.equal(rating)
                expect(_job.tags.length).to.equal(3)
                expect(_job.tags[0].toString()).to.equal('bici')
                expect(_job.tags[1].toString()).to.equal('vehiculo')
                expect(_job.tags[2].toString()).to.equal('rueda')
                expect(_job.assignedTo.toString()).to.equal(assignedTo)
                expect(_job.location).to.equal(newLocation)
                expect(_job.created).to.be.a('number')

            })
        })

        describe('request job', () => {
            let user, user2, job

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })

                pictures = ['dummy1', 'dummy2']

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']


                job = new Job({ pictures, user: user.id, budget, contact, description, location, tags })


                await user.save()
                await job.save()
                await Promise.all([user.save(), user2.save(), job.save()])


            })


            it('should succeed on correctly adding to requestedBy', async () => {
                const res = await logic.requestJob(user2.id, job.id)

                expect(res).to.be.undefined

                const jobs = await Job.find()

                expect(jobs.length).to.equal(1)

                const [_job] = jobs

                expect(_job.requestedBy[0].toString()).to.equal(user2.id)
            })

            describe('list requested by', () => {

                beforeEach(async () => {
                    const res = await logic.requestJob(user2.id, job.id)

                    expect(res).to.be.undefined

                    const jobs = await Job.find()

                    expect(jobs.length).to.equal(1)

                    const [_job] = jobs

                    expect(_job.requestedBy[0].toString()).to.equal(user2.id)

                })



                it('should correctly list users that request to do job',async () => {

                    const res = await logic.listRequestedBy(user.id,job.id)

                    expect(res).to.exist

                    expect(res[0].id).to.equal(user2.id) 
                    expect(res[0].username).to.equal(user2.username)



                    


                })

            })

        })

        describe('assign Job', () => {
            let user, user2, job

            beforeEach(async () => {
                user = new User({ name: 'John', surname: 'Doe', username: 'jd', password: '123' })
                user2 = new User({ name: 'Peter', surname: 'Griffin', username: 'pg', password: '123' })

                pictures = ['dummy1', 'dummy2']

                budget = `50.${Math.random()}`

                contact = '123@456.com'

                description = `hello world-${Math.random()}`

                location = 'barcelona'

                tags = ['nevera', 'frio']


                job = new Job({ pictures, user: user.id, budget, contact, description, location, tags })


                await user.save()
                await job.save()
                await Promise.all([user.save(), user2.save(), job.save()])
            })

            describe('with user requesting to do posted job', () => {

                beforeEach(async () => {

                    const res = await logic.requestJob(user2.id, job.id)

                    expect(res).to.be.undefined

                    const jobs = await Job.find()

                    expect(jobs.length).to.equal(1)

                    const [_job] = jobs

                    expect(_job.requestedBy[0].toString()).to.equal(user2.id)
                })



                it('should succeed on correct data', async () => {
                    const res = await logic.assignJob(user.id, user2.id, job.id)

                    expect(res).to.be.undefined

                    const jobs = await Job.find()
                    
                    expect(jobs.length).to.equal(1)

                    const [_job] = jobs

                    expect(_job.id).to.equal(job.id)
                    expect(_job.user.toString()).to.equal(user.id)
                    expect(_job.assignedTo.toString()).to.equal(user2.id)
                })


            })
        })
    })


    afterEach(() => User.deleteMany())
    afterEach(() => Job.deleteMany())

    after(() => mongoose.disconnect())
})