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
        return <section className="landing">

            <div className="body">
                <div className="login">
                    <h1>Login</h1>
                    <form className="login__form" onSubmit={this.handleSubmit}>
                        <input className="login__input" type="text" placeholder="Username" required="required" onChange={this.handleUsernameChange} />
                        <input className="login__input" type="password" placeholder="Password" required="required" onChange={this.handlePasswordChange} />
                        <button className="header__button" type="submit">Login</button> <a className="header__button" href="#" onClick={this.props.onGoBack}>back</a>
                    </form>
                </div>
            </div>


        </section>

    }
}

export default Login