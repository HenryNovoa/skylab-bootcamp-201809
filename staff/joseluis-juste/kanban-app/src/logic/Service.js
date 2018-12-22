import ValidationError from './exceptions/validationexception'
import NotValidSession from './exceptions/notvalidsessionexception'

require('isomorphic-fetch')

class ServiceBackEnd {

    constructor() {

        this.endpoint = "http://localhost:3333/api"
    }

    registerUser(user) {

        return fetch(`${this.endpoint}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Accept": "application/json"
                //'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((res) => {

                if (res.status === "OK") return res

                if (res.validationErrors)

                    throw new ValidationError(res.error, res.validationErrors)

                throw new Error(res.error)


            })
    }

    getUserPostits() {

        return new Promise((resolve, reject) => {

            const user = this.getUserFromSession()
            return fetch(`${this.endpoint}/user/${user.id}/postits`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json"
                    //'Authorization': 'Bearer ' + this.token
                }
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))
        })
    }


    addPostit(state, content) {

        return new Promise((resolve, reject) => {

            const user = this.getUserFromSession()
            return fetch(`${this.endpoint}/postit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": "application/json"
                    //'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify({ userid: user.id, content: content, state: state })
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))
        })
    }

    deletePosIt(id) {

        return new Promise((resolve, reject) => {

            const user = this.getUserFromSession()
            return fetch(`${this.endpoint}/postit/${id}/${user.id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json"
                    //'Authorization': 'Bearer ' + this.token
                }

            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))
        })

    }

    findPostit(id) {

        return new Promise((resolve, reject) => {

            const user = this.getUserFromSession()
            return fetch(`${this.endpoint}/postit/${id}/${user.id}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json"
                    //'Authorization': 'Bearer ' + this.token
                }

            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    throw new Error(res.error)


                }).catch(err => reject(err))
        })
    }

    updatePostit(id, state, content) {

        return new Promise((resolve, reject) => {

            const user = this.getUserFromSession()
            return fetch(`${this.endpoint}/postit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Accept": "application/json"
                    //'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify({ userid: user.id, content: content, state: state })
            })
                .then(res => res.json())
                .then((res) => {

                    if (res.status === "OK") return resolve(res)

                    if (res.validationErrors)

                        throw new ValidationError(res.error, res.validationErrors)

                    throw new Error(res.error)


                }).catch(err => reject(err))
        })
    }


    loginUser(username, password) {

        return fetch(`${this.endpoint}/user/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                "Accept": "application/json"
                //'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then((res) => {

                if (res.status === "OK") {
                    sessionStorage.setItem("user", JSON.stringify(res.data))
                    return res
                }

                if (res.validationErrors)
                    throw new ValidationError(res.error, res.validationErrors)

                throw new Error(res.error)

            })

    }

    getUserFromSession() {

        if (!sessionStorage.getItem("user")) throw new NotValidSession("The user session is not valid")
        return JSON.parse(sessionStorage.getItem("user"))
    }

    logoutUser() {

        if (sessionStorage.getItem("user")) sessionStorage.clear()
    }

    isLogged() {

        if (sessionStorage.getItem("user")) return true
        return false
    }

}

export default ServiceBackEnd