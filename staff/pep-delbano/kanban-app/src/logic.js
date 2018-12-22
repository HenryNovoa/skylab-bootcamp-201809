const logic = {
    _userId: sessionStorage.getItem('userId') || null,
    _token: sessionStorage.getItem('token') || null,
    //(these 2 items will be in the sessionStorage to let it know which account is logged in.. when logout we just remove it, so we can't access the account anymore)

    url: 'NO-URL',

    registerUser(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!name.trim()) throw Error('name is empty or blank')
        if (!surname.trim()) throw Error('surname is empty or blank')
        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch(`${this.url}/users`, {
            method: 'POST',  //we save the input form data to the api
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

    login(username, password) { //POST to send input data to API
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!username.trim()) throw Error('username is empty or blank')
        if (!password.trim()) throw Error('password is empty or blank')

        return fetch(`${this.url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)

                const { id, token } = res.data  //we get both attributes from the response of the 'POST' method 

                this._userId = id
                this._token = token

                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('token', token)
                //we'll get these setted items for the session storage of the browser, to tell it which account is logged in
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

    addPostit(text) {
        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (!text.trim()) throw Error('text is empty or blank')

        return fetch(`${this.url}/users/${this._userId}/postits`, {
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
        return fetch(`${this.url}/users/${this._userId}/postits`, {
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

    removePostit(id) {
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        return fetch(`${this.url}/users/${this._userId}/postits/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this._token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    },

    modifyPostit(id, text, status) {
        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

        if (!id.trim().length) throw Error('id is empty or blank')

        if (text && typeof text !== 'string') throw TypeError(`${text} is not a string`)

        if (text && !text.trim()) throw Error('text is empty or blank')

        return fetch(`${this.url}/users/${this._userId}/postits/${id}`, {
            method: 'PUT',  //method to change some data
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({ text, status })
        })
            .then(res => res.json())  //it returns the data in object format
            .then(res => {
                if (res.error) throw Error(res.error)
            })
    }
}

// export default logic
module.exports = logic