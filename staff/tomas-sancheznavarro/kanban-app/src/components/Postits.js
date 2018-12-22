import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

class Postits extends Component {
    state = { postits: [] }

    componentDidMount() {
        logic.listPostits()
            .then(postits => { this.setState({ postits }) })

        // TODO error handling!
    }

    handleSubmit = (text, status) => {
        try {
            logic.addPostit(text, status)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    handleModifyPostit = (id, text, status) =>
        logic.modifyPostit(id, text, status)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!

    handleChangeStatus = (id, status) => logic.modifyStatus(id, status)
        .then(() => logic.listPostits())
        .then(postits => this.setState({ postits }))


    render() {
        return <div>
            <h1>Kanban App <i className="fas fa-sticky-note"></i></h1>

            <InputForm onSubmit={this.handleSubmit} />

            <div className='container'>
                <section className='postit-col'>
                    <h1>To Do</h1>
                    {/* <InputForm status='TODO' onSubmit={this.handleSubmit} /> */}
                    {this.state.postits.filter(postit => postit.status === 'TODO').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} name='TODO' />)}
                </section>
                <section className='postit-col'>
                    <h1>Doing</h1>
                    {/* <InputForm status='DOING' onSubmit={this.handleSubmit} /> */}
                    {this.state.postits.filter(postit => postit.status === 'DOING').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} name='DOING' />)}
                </section >
                <section className='postit-col'>
                    <h1>Review</h1>
                    {/* <InputForm status='REVIEW' onSubmit={this.handleSubmit} /> */}
                    {this.state.postits.filter(postit => postit.status === 'REVIEW').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} name='REVIEW' />)}
                </section>
                <section className='postit-col'>
                    <h1>Done</h1>
                    {/* <InputForm status='DONE' onSubmit={this.handleSubmit} /> */}
                    {this.state.postits.filter(postit => postit.status === 'DONE').map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} name='DONE' />)}
                </section>
            </div>
        </div>
    }
}

export default Postits
