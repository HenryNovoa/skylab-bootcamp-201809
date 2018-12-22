import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'
import AddBuddy from './AddBuddy'

class Postits extends Component {
    state = { postits: [], buddies: [] }

    componentDidMount() {
        logic.listBuddies()
            .then(buddies => { this.setState({ buddies }) })
       
        logic.listPostits()
            .then(postits => { this.setState({ postits }) })

        

        // TODO error handling!
    }

    handleSubmit = text => {
        try {
            logic.addPostit(text)
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


    handleModifyPostit = (id, text) =>
        logic.modifyPostit(id, text)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    handleUpdateStatus = (id, status) =>
        logic.updatePostitStatus(id, status)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))



    handleAddBuddy = username =>
        logic.addBuddy(username)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
            .then(logic.listBuddies())
            .then(buddies => { this.setState({ buddies }) })



   
    handleAssignPostit = (buddyId, postitId) => {
        logic.assignPostitTo(buddyId, postitId)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
    }
     // TODO error handling!



    render() {
        return <div>
            <h1>Post-It App <i className="fas fa-sticky-note"></i></h1>

            <InputForm onSubmit={this.handleSubmit} />
            <AddBuddy onAddBuddy={this.handleAddBuddy} />


            <section className="postits">
                <div className="postits__category postits__TODO">
                    <h2>TODO</h2>
                    {this.state.postits.map(postit => { if (postit.status === 'TODO') return <Post key={postit.id} onAssignPostit={this.handleAssignPostit} buddies={this.state.buddies} status={postit.status} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onStatusUpdate={this.handleUpdateStatus} onUpdatePost={this.handleModifyPostit} /> })}
                </div>
                <div className="postits__category postits__DOING">
                    <h2>DOING</h2>
                    {this.state.postits.map(postit => { if (postit.status === 'DOING') return <Post key={postit.id} onAssignPostit={this.handleAssignPostit} buddies={this.state.buddies} status={postit.status} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onStatusUpdate={this.handleUpdateStatus} onUpdatePost={this.handleModifyPostit} /> })}
                </div>
                <div className="postits__category postits__REVIEW">
                    <h2>REVIEW</h2>
                    {this.state.postits.map(postit => { if (postit.status === 'REVIEW') return <Post key={postit.id} onAssignPostit={this.handleAssignPostit} buddies={this.state.buddies} status={postit.status} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onStatusUpdate={this.handleUpdateStatus} onUpdatePost={this.handleModifyPostit} /> })}
                </div>
                <div className="postits__category postits__DONE">
                    <h2>DONE</h2>
                    {this.state.postits.map(postit => { if (postit.status === 'DONE') return <Post key={postit.id} onAssignPostit={this.handleAssignPostit} buddies={this.state.buddies} status={postit.status} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onStatusUpdate={this.handleUpdateStatus} onUpdatePost={this.handleModifyPostit} /> })}
                </div>
            </section>
        </div>
    }
}

export default Postits
