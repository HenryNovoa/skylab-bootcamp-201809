import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text, status: this.props.status }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text, this.state.status)
    }

    handleStatusChange = event => {
        event.preventDefault()

        const status = event.target.value

        this.setState({status})
        this.props.onUpdatePost(this.props.id, this.state.text, status)
    }

    // handleStatus = () => {
    //     this.props.onUpdatePost(this.props.id, this.state.status)
    // }

    render() {
        return <article className="post">

            <div className="post_text">
                <textarea className="post_input" defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />
            </div>
            <div className="post_buttons">
                <div>
                    <button className="btnt_delete" onClick={() => this.props.onDeletePost(this.props.id)}><p>Delete</p></button>
                </div>
                <div className="post_status" >
                    <select defaultValue={this.state.status} className="select_status" onChange={this.handleStatusChange}>
                        <option type='button' value="TODO" onClick={this.handleStatusChange}>TODO</option>
                        <option type='button' value="DOING" onClick={this.handleStatusChange}>DOING</option>
                        <option type='button' value="REVIEW" onClick={this.handleStatusChange}>REVIEW</option>
                        <option type='button' value="DONE" onClick={this.handleStatusChange}>DONE</option>
                    </select>
                </div >
            </div >
        </article >
    }
}

export default Post