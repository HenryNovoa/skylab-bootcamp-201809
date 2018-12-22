import React, { Component } from 'react'

class AddBuddy extends Component {
    state = { text: '' }

    handleInput = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.onAddBuddy(this.state.text)

        this.setState({ text: '' })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input value={this.state.text} placeholder="Add friend" onChange={this.handleInput} />

            <button type="submit"><i className="fas fa-plus"></i></button>
        </form>
    }
}

export default AddBuddy