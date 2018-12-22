import React, { Component } from 'react'

class InputForm extends Component {
    state = { text: '' }

    handleInput = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state.text)

        this.setState({ text: '' })
    }

    render() {
        return <form className="add_post" onSubmit={this.handleSubmit}>
            <input className="input__post" value={this.state.text} placeholder="Add a new task..." onChange={this.handleInput} />

            <button className="btn__post" type="submit"><p>Add</p></button>
        </form>
    }
}

export default InputForm