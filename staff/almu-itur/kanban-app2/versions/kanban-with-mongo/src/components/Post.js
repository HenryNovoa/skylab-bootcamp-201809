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

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text, this.props.status)
    }

    render() {

        return (
        <article className="post" draggable onDragStart={this.props.onDragStart} >

            <div className="delete-postit"><a className="button-delete" onClick={() => this.props.onDeletePost(this.props.id)}><i className="fas fa-times" id="delete-button"></i></a></div>
            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

        </article>
        )
    }
}

export default Post