import React, { Component } from 'react'

class Profile extends Component {
    state = { name: '', surname: '', newPassword: '', repNewPassword: '', currentPassword: '' }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnameChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }

    handleNewPasswordChange = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    handleRepNewPasswordChange = event => {
        const repNewPassword = event.target.value

        this.setState({ repNewPassword })
    }

    handleCurrentPasswordChange = event => {
        const currentPassword = event.target.value

        this.setState({ currentPassword })
    }

    handleProfileEdit = event => {
        event.preventDefault()

        const { name, surname, newPassword, repNewPassword, currentPassword } = this.state

        this.props.onProfileEdit(name, surname, newPassword, repNewPassword, currentPassword)
    }


    render() {
        return <div>
            <button onClick={this.handleProfileClick}>Profile</button>
            <section>
                <form onSubmit={this.handleProfileEdit}>
                    <input type="text" placeholder="your name" onChange={this.handleNameChange} />
                    <input type="text" placeholder="your surname" onChange={this.handleSurnameChange} />
                    <input type="text" placeholder="new password" onChange={this.handleNewPasswordChange} />
                    <input type="text" placeholder="repeat new password" onChange={this.handleRepNewPasswordChange} />
                    <input type="text" placeholder="current password" onChange={this.handleCurrentPasswordChange} />
                    <button type="submit">Update</button>
                </form>
            </section>
        </div>
    }

}

export default Profile


