import data from './data'
// const data = require('./data')

const { Postit } = data

const logic = {
    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,
    _postits: [],

    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ name, surname, username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    login(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch('http://localhost:5000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                const { id, token } = res.data

                this._userId = id
                this._token = token

                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('token', token)
            })
    },

    get loggedIn() {
        return !!this._userId
    },

    logout() {
        this._postits = []
        this._userId = null
        this._token = null

        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
    },

    createPostit(text) {
        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim()) throw Error('text is empty or blank')

        // this._postits.push(new Postit(text))
       
        return fetch(`http://localhost:5000/api/users/${this._userId}/postits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ text })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    listPostits() {
        return fetch(`http://localhost:5000/api/users/${this._userId}/postits/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    deletePostit(id) {
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`http://localhost:5000/api/users/${this._userId}/postits/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ postits: this._postits })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    updatePostit(id, text) {
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim()) throw Error('text is empty or blank')

        return fetch(`http://localhost:5000/api/users/${this._userId}/postits/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ text })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    listProfile() {
        return fetch(`http://localhost:5000/api/users/${this._userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                return res.data
            })
    },

    modifyProfile(name, surname, newPassword, password){
            debugger
            if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
            if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
            if (typeof newPassword !== 'string') throw TypeError(`${newPassword} is not a string`)
            if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
    
            if (!name.trim()) throw Error('name is empty or blank')
            if (!surname.trim()) throw Error('surname is empty or blank')
            if (!newPassword.trim()) throw Error('newPassword is empty or blank')
            if (!password.trim()) throw Error('password is empty or blank')
    
            return fetch(`http://localhost:5000/api/users/${this._userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${this._token}`
                },
                body: JSON.stringify({ name, surname, newPassword, password })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) throw Error(res.error)
                })

    }
}

export default logic
// module.exports = logic