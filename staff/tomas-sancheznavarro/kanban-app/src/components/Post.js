import React, { Component } from 'react'

class Post extends Component {
    state = {
        text: this.props.text,
        status: this.props.status
    }

    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleStatusChange = (event, text, id) => {
        this.props.onUpdatePost(id, text, event.target.value)
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    render() {
        return <article className="post">
            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

            <button onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></button>
            <select defaultValue={this.state.status} onChange={(event) => this.handleStatusChange(event, this.state.text, this.props.id)}>
                <option value="TODO" selected={this.props.name === 'TODO'}>To Do</option>
                <option value="DOING" selected={this.props.name === 'DOING'}>Doing</option>
                <option value="REVIEW" selected={this.props.name === 'REVIEW'}>Review</option>
                <option value="DONE" selected={this.props.name === 'DONE'}>Done</option>
            </select>
        </article>
    }
}

export default Post