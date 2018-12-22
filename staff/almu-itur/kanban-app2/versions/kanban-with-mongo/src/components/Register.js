import React, { Component } from 'react'
import { Button, Input } from "mdbreact"

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
        return <div className="register-container">
        <form onSubmit={this.handleSubmit}>
            <Input type="text" label="Name" onChange={this.handleNameChange} />
            <Input type="text" label="Surname" onChange={this.handleSurnameChange} />
            <Input type="text" label="Username" onChange={this.handleUsernameChange} />
            <Input type="password" label="Password" onChange={this.handlePasswordChange} />
            <Button type="submit">Register</Button> <a href="#" onClick={this.props.onGoBack}>back</a>
        </form>
        </div>
    }
}

export default Register