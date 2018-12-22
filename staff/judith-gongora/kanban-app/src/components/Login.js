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
        return <div className="form__container">
            <form onSubmit={this.handleSubmit}>
            <img src="https://res.cloudinary.com/skylabcoders/image/upload/v1541952996/pintegram/images.png"></img>
                <p>Kanban App</p>
            <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
            <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
            <button type="submit">Login</button> <a href="#" onClick={this.props.onGoBack}>back</a>
        </form>
        </div>
    }
}

export default Login