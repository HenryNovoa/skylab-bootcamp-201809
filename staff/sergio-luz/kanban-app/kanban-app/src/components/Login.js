import React, { Component } from 'react'

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
        return<div className='login-register'>
             <form onSubmit={this.handleSubmit} className='profile__body'>
                <input className='input--white'  type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                <input  className='input--white' type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                {/* <button type="submit">Login</button> <a href="/#/">back</a> */}
                <button className='button button--white' type="submit">Login</button> <a href="#" onClick={this.props.onGoBack}>back</a>
            </form>
        </div>
    }
}

export default Login