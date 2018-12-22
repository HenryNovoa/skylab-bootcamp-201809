import React, { Component } from 'react'

class Register extends Component {
    state = { name: '', surname: '', username: '', password: '' }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnameChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { name, surname, username, password } = this.state

        this.props.onRegister(name, surname, username, password)
    }

    render() {
        return <div className="form__container">
            <form onSubmit={this.handleSubmit}>
                <img src="https://res.cloudinary.com/skylabcoders/image/upload/v1541952996/pintegram/images.png"></img>
                <p>Kanban App</p>
                <input type="text" placeholder="Name" onChange={this.handleNameChange} />
                <input type="text" placeholder="Surname" onChange={this.handleSurnameChange} />
                <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                <button type="submit">Register</button> <a href="#" onClick={this.props.onGoBack}>back</a>
            </form>
        </div> 
    }
}

export default Register