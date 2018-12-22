import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'
import Error from './Error';

class Postits extends Component {
    state = { postits: [], error: '' }

    componentDidMount() {
        logic.listPostits()
            .then(postits => { this.setState({ postits }) })

        // TODO error handling!
    }

    handleSubmit = text => {
        try {
            logic.addPostit(text)
                .catch(err => { console.log(err.message) })
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
                .then(()=> this.setState({error:''}))
        } catch (err) {
            this.setState({ error: err.message })
        }

    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    handleModifyPostit = (id, text) =>
        logic.modifyPostit(id, text)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    render() {
        return <div className='home__body'>
            <h1>Post-It App <i className="fas fa-sticky-note"></i></h1>

            <InputForm onSubmit={this.handleSubmit} />
            <Error message={this.state.error}></Error>

                <section className='board__postits'>
                    {this.state.postits.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                </section>

        </div>
    }
}

export default Postits
