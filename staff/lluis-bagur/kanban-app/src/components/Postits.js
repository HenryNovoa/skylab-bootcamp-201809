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
            status = 'TODO'
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


    handleModifyPostit = (id, text, status) => {
        if (status === undefined) {
            return logic.modifyPostit(id, text, status = 'TODO')
                .then(() => logic.listPostits())

                .then(postits => this.setState({ postits }))

        } else {
            return logic.modifyPostit(id, text, status)
                .then(() => logic.listPostits())

                .then(postits => this.setState({ postits }))
        }
    }

    // TODO error handling!


    render() {
        return <div className="kanban__post">

            <section className="newPost">

                <InputForm onSubmit={this.handleSubmit} />
            </section>
            <div className="columns">
                <section className="columns_posts">
                    <h2>TODO</h2>
                    {this.state.postits.filter(postit => postit.status === "TODO").map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                </section>
                <section className="columns_posts">
                    <h2>DOING</h2>
                    {this.state.postits.filter(postit => postit.status === "DOING").map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                </section>
                <section className="columns_posts">
                    <h2>REVIEW</h2>
                    {this.state.postits.filter(postit => postit.status === "REVIEW").map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                </section>
                <section className="columns_posts">
                    <h2>DONE</h2>
                    {this.state.postits.filter(postit => postit.status === "DONE").map(postit => <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                </section>

            </div>
        </div>
    }
}

export default Postits
