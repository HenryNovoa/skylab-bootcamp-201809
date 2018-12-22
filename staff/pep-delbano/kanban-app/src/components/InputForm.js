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
        return <form className="form-group createPostit-form" onSubmit={this.handleSubmit}>
            <div className="input-group createPostit-input">
                <div className="input-group-prepend"><span className="input-group-text" id="inputGroup-sizing-default">New Postit</span>
                </div>
                    <input value={this.state.text} placeholder="Write text here..." onChange={this.handleInput} />
            <button type="submit"><i className="fas fa-plus"></i></button>
            </div>
        </form>
    }
}

export default InputForm