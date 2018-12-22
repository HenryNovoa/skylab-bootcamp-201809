import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'
import Error from './Error'

class Postits extends Component {
    state = { postits: [], error: null }

    componentDidMount() {
        try {
            logic.listPostits()
                .then(postits => { this.setState({ postits }) })
        } catch ({ message }) {
            this.setState({ error: message })
        }


    }

    handleSubmit = text => {
        try {
            logic.addPostit(text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
        } catch ({ message }) {

            this.setState({ error: message })
        }
    }


    handleRemovePostit = id => {
        try {
            logic.removePostit(id)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    handleModifyPostit = (id, text) => {
        try {
            logic.modifyPostit(id, text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    handleChangeStatus = (id, status) => {
        try {
            logic.modifyStatus(id, status)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }


    render() {
        const { error } = this.state
        return <div className='postits'>

            <div className='postits__head'>
                <h1 className='postits__title'>Post-It App <i className="fas fa-sticky-note"></i></h1>
                <InputForm onSubmit={this.handleSubmit} />
                {error && <Error message={error} />}
            </div>

            <div className='postits__container'>
                <section className='postits__column'>
                    <h1 className= 'postits__state'>To Do</h1>
                    {this.state.postits.filter(postit => postit.status === 'TODO').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeStatus={this.handleChangeStatus} />)}
                </section>
                <section className='postits__column'>
                    <h1 className= 'postits__state'>Doing</h1>
                    {this.state.postits.filter(postit => postit.status === 'DOING').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeStatus={this.handleChangeStatus} />)}
                </section>
                <section className='postits__column'>
                    <h1 className= 'postits__state'>Review</h1>
                    {this.state.postits.filter(postit => postit.status === 'REVIEW').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeStatus={this.handleChangeStatus} />)}
                </section>
                <section className='postits__column'>
                    <h1 className= 'postits__state'>Done</h1>
                    {this.state.postits.filter(postit => postit.status === 'DONE').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeStatus={this.handleChangeStatus} />)}
                </section>
            </div>
        </div>
    }
}

export default Postits
