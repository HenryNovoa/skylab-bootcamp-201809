import React, {Component} from 'react'

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
        return <div className="container-login">
            <h1 className="login-title">Sign In</h1>
            <form className="form-group form-login" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input className="form-control" required type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" required type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                </div>
                {/* <button type="submit">Login</button> <a href="/#/">back</a> */}
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" type="submit">Login</button> <button className="btn-register btn btn-link" href="#" onClick={this.props.onGoBack}>Go Back</button>
                </div>
            </form>
        </div>
    }
}

export default Login