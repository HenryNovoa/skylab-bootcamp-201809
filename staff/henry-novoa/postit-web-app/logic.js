const { User, Postit } = require('./data')


const logic = {
    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        let user = User.findByUsername(username)

        if (user) throw Error(`username ${username} already registered`)

        user = new User(name, surname, username, password)

        user.save()
    },

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        const user = User.findByUsername(username)

        if (!user || user.password !== password) throw Error('invalid username or password')

        return user.id
    },

    retrieveUser(id) {
        if (typeof id !== 'number') throw TypeError(`${id} is not a number`)

        const user = User.findById(id)
        debugger
        if (!user) throw Error(`user with id ${id} not found`)

        const _user = new User(
            user.name,
            user.surname,
            user.username,
        )
        _user.postits = user.postits
        _user.id = user.id

        delete _user.password

        return _user
    },
    createPostit(text, userId) {
        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim()) throw Error('text is empty or blank')

        if (typeof userId !== 'number') throw new TypeError(`${userId} is not a number`)

      
        const postit = new Postit(text)

        let _user = User.findById(userId)

        let user = new User(_user.name,_user.surname,_user.username,_user.password)
        debugger
        user.id = _user.id
        user.savePostit(postit)
        //this._postits.push(new Postit(text))

        
    },

    listPostitsByUser(userId, token) {
        debugger
        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)

        if (!userId.trim()) throw Error('userId is empty or blank')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim()) throw Error('token is empty or blank')

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return this._postits = res.data.postits || []
            })
    },

    deletePostit(id, userId, token) {
        if (typeof id !== 'number') throw new TypeError(`${id} is not a number`)

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)

        if (!userId.trim()) throw Error('userId is empty or blank')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim()) throw Error('token is empty or blank')

        this._postits = this._postits.filter(postit => postit.id !== id)

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ postits: this._postits })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    updatePostit(id, text, userId,token) {
        if (typeof id !== 'number') throw new TypeError(`${id} is not a number`)

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim()) throw Error('text is empty or blank')
        
        let posit = this._postits.find(text => text.id === id)

        let blabla = posit.text

        let index = this._postits.findIndex(text => text.id === id )

        this._postits[index].text = blabla
        


        return fetch(`https://skylabcoders.herokuapp.com/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ postits: this._postits })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
      
    }
}

module.exports = logic