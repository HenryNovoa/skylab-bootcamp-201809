import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text, status: this.props.status }

    handleSelectChange = event => {
        const status = event.target.value

        this.setState({ status })

        this.props.onUpdatePost(this.props.id, this.state.text, status)
    }

    handleChange = event => {
        const text = event.target.value
        const status = event.target.dataset.status

        this.setState({ text, status })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text, this.state.status)
    }

    render() {
        return <article id={this.props.id} className="post px-2 my-3 py-2" draggable="true" onDragStart={this.props.onDrag}>
            <select className="form-control" value={this.state.status} onChange={this.handleSelectChange}>
                <option value="TODO">TODO</option>
                <option value="DOING">DOING</option>
                <option value="REVIEW">REVIEW</option>
                <option value="DONE">DONE</option>
            </select>
            <textarea className="w-100" defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} data-status={this.props.status} />
            <button onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></button>
        </article>
    }
}

export default Post