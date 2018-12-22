const { User, Postit } = require('../data')
const { AlreadyExistsError, NotFoundError, ValueError, AuthError  } = require('../errors')

const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw new ValueError('name is empty or blank')
        if (!surname.trim()) throw new ValueError('surname is empty or blank')
        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (user) throw new AlreadyExistsError(`username ${username} already registered`)

                user = new User({ name, surname, username, password })

                return user.save()
            })
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw new ValueError('username is empty or blank')
        if (!password.trim()) throw new ValueError('password is empty or blank')

        return User.findByUsername(username)
            .then(user => {
                if (!user || user.password !== password) throw Error('invalid username or password')

                return user.id
            })
    },

    retrieveUser(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const _user = user.toObject()

                _user.id = id

                delete _user.password

                return _user
            })
    },

    updateUser(id, name, surname, username, newPassword, repeatPassword, password) {
        if (typeof id !== 'string') throw TypeError(`id ${id} is not a string`)
        if (name != null && typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (surname != null && typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (username != null && typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (newPassword != null && typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
        if (repeatPassword != null && typeof repeatPassword !== 'string') throw TypeError(`${repeatPassword} is not a string`)
        if (typeof password !== 'string') throw TypeError(`password ${password} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')
        if (name != null && !name.trim().length) throw new ValueError('name is empty or blank')
        if (surname != null && !surname.trim().length) throw new ValueError('surname is empty or blank')
        if (username != null && !username.trim().length) throw new ValueError('username is empty or blank')
        if (newPassword != null && !newPassword.trim().length) throw new ValueError('newPassword is empty or blank')
        if (repeatPassword != null && !repeatPassword.trim().length) throw new ValueError('repeatPassword is empty or blank')
        if (!password.trim().length) throw new ValueError('password is empty or blank')
        debugger
        return User.findById(id)
            .then(user => {
                debugger
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                if (user.password !== password) throw new AuthError('invalid password')

                if (newPassword !== repeatPassword) throw new AuthError('New password is not the same in both fields')

                if (username) {
                    return User.findByUsername(username)
                        .then(_user => {
                            if (_user) throw new AlreadyExistsError(`username ${username} already exists`)

                            name != null && (user.name = name)
                            surname != null && (user.surname = surname)
                            user.username != null && (user.username = username)
                            newPassword != null && (user.password = newPassword)

                            return user.save()
                        })
                }
                else {
                    name != null && (user.name = name)
                    surname != null && (user.surname = surname)
                    username != null && (user.username = username)
                    newPassword != null && (user.password = newPassword)

                    return user.save()
                }
            })
    },

    /**
     * Adds a postit
     * 
     * @param {number} id The user id
     * @param {string} text The postit text
     * 
     * @throws {TypeError} On non-numeric user id, or non-string postit text
     * @throws {Error} On empty or blank postit text
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id
     */
    addPostit(id, text) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const postit = new Postit({ text })

                user.postits.push(postit)

                return user.save()
            })
    },

    listPostits(id) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                return user.postits
            })
    },

    /**
     * Removes a postit
     * 
     * @param {number} id The user id
     * @param {number} postitId The postit id
     * 
     * @throws {TypeError} On non-numeric user id, or non-numeric postit id
     * 
     * @returns {Promise} Resolves on correct data, rejects on wrong user id, or postit id
     */
    removePostit(id, postitId) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('id is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const { postits } = user

                const index = postits.findIndex(postit => postit.id === postitId)

                if (index < 0) throw new NotFoundError(`postit with id ${postitId} not found in user with id ${id}`)

                postits.splice(index, 1)

                return user.save()
            })
    },

    modifyPostit(id, postitId, text) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)

        if (!id.trim().length) throw new ValueError('is is empty or blank')

        if (typeof postitId !== 'string') throw TypeError(`${postitId} is not a string`)

        if (!postitId.trim().length) throw new ValueError('postit id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim().length) throw new ValueError('text is empty or blank')

        return User.findById(id)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                const { postits } = user

                const postit = postits.find(postit => postit.id === postitId)

                if (!postit) throw new NotFoundError(`postit with id ${postitId} not found in user with id ${id}`)

                postit.text = text

                return user.save()
            })
    }
}

module.exports = logic