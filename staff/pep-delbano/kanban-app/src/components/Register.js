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
        return <div className="container-register">
            <h1 className="register-title">Sign Up</h1>
            <form className="form-group form-register" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input className="form-control" required type="text" placeholder="Name" onChange={this.handleNameChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" required type="text" placeholder="Surname" onChange={this.handleSurnameChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" required type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                </div>
                <div className="form-group">    
                    <input className="form-control" required type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg"type="submit">Register</button> <button className="btn-register btn btn-link" href="#" onClick={this.props.onGoBack}>Go Back</button>
                </div>
            </form>
        </div>
    }
}

export default Register