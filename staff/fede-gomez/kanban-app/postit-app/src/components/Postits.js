import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

//TODO:     Crear array default en la base de datos
//          Obtener array del back

class Postits extends Component {
    state = {
        postits: []
    }

    componentWillMount() {
        // logic.listPostits()
        //     .then(postits => { this.setState({ postits }) })

        try {
            logic.listPostits()
                .then(_postits => {
                    this.setState({ postits: [..._postits] })
                    // for (let postit of this.state.postits) {
                    //     board[postit.column].push(postit)
                    // }
                    // this.setState({ board: { ...board } })

                })
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
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

    handleChangeColumn = (id, column) => {
        logic.changeColumn(id, column)
            .then(() => {
                try {
                    logic.listPostits()
                        .then(_postits => {
                            this.setState({ postits: [..._postits] })
                        })
                } catch ({ message }) {
                    alert(message) // HORROR! FORBIDDEN! ACHTUNG!
                }
            })
    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!

    handleChangeText = (postitId, newText) => {
        
        logic.updatePostit(postitId, newText ? newText : 'No text')
            .then(() => {
                try {
                    logic.listPostits()
                        .then(_postits => {
                            this.setState({ postits: [..._postits] })
                        })
                } catch ({ message }) {
                    alert(message) // HORROR! FORBIDDEN! ACHTUNG!
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    // TODO error handling!


    render() {

        return (

            <div className='main'>
                <h1 className='main__title'>Kanban-App <i className="fas fa-sticky-note"></i></h1>

                <InputForm onSubmit={this.handleSubmit} />
            
                <div className='kanban-columns'>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>To do</h2>
                        {this.state.postits.filter(postit => postit.column === 'todo').map(postit => <Post key={postit.id} column={'todo'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onChangeText={this.handleChangeText} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Doing</h2>
                        {this.state.postits.filter(postit => postit.column === 'doing').map(postit => <Post key={postit.id} column={'doing'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onChangeText={this.handleChangeText} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Review</h2>
                        {this.state.postits.filter(postit => postit.column === 'review').map(postit => <Post key={postit.id} column={'review'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onChangeText={this.handleChangeText} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Done</h2>
                        {this.state.postits.filter(postit => postit.column === 'done').map(postit => <Post key={postit.id} column={'done'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onChangeText={this.handleChangeText} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                </div>
            </div>
        )
    }
}

export default Postits
