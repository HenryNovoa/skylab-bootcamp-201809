import React, { Component } from 'react'
import logic from '../logic'
class Profile extends Component {
    state = { name: '', surname: '', newPassword:'' , password:'' }

    componentDidMount(){
        logic.listProfile()
            .then(profile =>  {
                 this.setState({ name : profile.name, 
                                                surname : profile.surname}) })
    }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnameChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }
    //Next iteration
    // handleUsernameChange = event => {
    //     const username = event.target.value

    //     this.setState({ username })
    // }

    handleNewPasswordChange = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    handlePasswordConfirm = event =>{
        const password = event.target.value 

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { name, surname,newPassword, password } = this.state

        this.props.onUpdateProfile(name, surname,newPassword , password)
    }

    render() {
        return <div><h1>Profile</h1>
        <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder={this.state.name} defaultValue={this.state.name} onChange={this.handleNameChange} />
            <input type="text" placeholder={this.state.surname} defaultValue={this.state.surname} onChange={this.handleSurnameChange} />
            {/* <input type="text" placeholder="Username" onChange={this.handleUsernameChange} /> */}
            <input type="password" placeholder="New Password" onChange={this.handleNewPasswordChange} />
            <input type="password" placeholder="Current Password" onChange={this.handlePasswordConfirm} />
            <button type="submit">Update</button> <a href="#" onClick={this.props.onProfileGoBack}>back</a>
        </form></div>
       
    }
}

export default Profile