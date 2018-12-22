import React, { Component } from 'react'
import Navbar from './Navbar'
import Error from './Error'


class Login extends Component {
    state = { username: '', password: '' }

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

        const { username, password } = this.state

        this.props.onLogin(username, password)
    }

    render() {

        return <div className="background">
            <Navbar />
            <form className="form-log" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                {/* <button type="submit">Login</button> <a href="/#/">back</a> */}
                <button type="submit">Login</button> 
            </form>
            <a className="back" href="#" onClick={this.props.onGoBack}>back</a>
            {this.props.error && <Error className="error" message={this.props.error} />}
        </div>
    }
}

export default Login