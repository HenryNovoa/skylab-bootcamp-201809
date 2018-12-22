import React, { Component } from 'react'
import logic from '../logic'


class Profile extends Component {

    state = {id: '', name: '', surname: '', username: '', passwordUser: '', newPassword:'', repeatNewPassword:'' }

    componentDidMount() {
        logic.getUser()
            .then((res) => this.setState({ 
                id: res.id,
                name: res.name, 
                username: res.username, 
                surname: res.surname }) )
            
        // TODO error handling!
    }

    handlePasswordChange = event => {
        const passwordUser = event.target.value
        this.setState({ passwordUser })
    }

    handleNewPasswordChange = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    handleRepeatNewPasswordChange = event => {
        const repeatNewPassword = event.target.value

        this.setState({ repeatNewPassword })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { passwordUser, newPassword, repeatNewPassword } = this.state
        if(newPassword === repeatNewPassword) {
            //logic.updatePassword(passwordUser, newPassword)
            console.log(passwordUser, newPassword, repeatNewPassword) 
        }
            
    }

  render() {
    return (
      <div>
        <p>Profile</p>
        <br></br>
        <p>{this.state.name}</p>
        <br></br>
        <p>{this.state.username}</p>
        <form onSubmit={this.handleSubmit}>
            <input type="password" placeholder="password" onChange={this.handlePasswordChange} />
            <input type="password" placeholder="new password" onChange={this.handleNewPasswordChange} />
            <input type="password" placeholder="repeat new password" onChange={this.handleRepeatNewPasswordChange} />
            <button type="submit">Update</button> <a href="#" onClick={this.props.onGoBackPostits}>back</a>
        </form>
      </div>
    )
  }
}

export default Profile
