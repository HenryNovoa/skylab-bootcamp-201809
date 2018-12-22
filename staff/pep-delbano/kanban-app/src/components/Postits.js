import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Status from './Status'

class Postits extends Component {
    state = { postits: [] }

    componentDidMount() {
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
            .then(() => logic.listPostits())  //una vez borrado el postit, listar todos de nuevo, sin el eliminado
            .then(postits => this.setState({ postits })) //actualizamos state con los cambios de los postits listados

    // TODO error handling!


    handleModifyPostit = (id, text, status) => 
        logic.modifyPostit(id, text, status)
            .then(() => logic.listPostits()) //una vez borrado el postit, listar todos de nuevo con los cambios
            .then(postits => this.setState({ postits })) //actualizamos state con los cambios de los postits listados

    // TODO error handling!


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = (id) => {
        this.handleModifyPostit(id, this.state.text)
    }

    update = (e, name) => {
        let id = e.dataTransfer.getData("id")  //we get it from setData, and is the postit.id
        let postits = this.state.postits.filter(postit => {
            if(postit.id === id) {
                postit.status = name
                this.handleModifyPostit(postit.id, postit.text, name)
            }
            return postit
        })
        this.setState({...this.state, postits})  //... aplica los cambios de postits (arg2), al state(arg1)
    }


    render() {
        
        //guardamos con el forEach de abajo, los postits dl state en el array q coincida con cada atributo 'status' dl postit
        let postits = { TODO: [], DOING: [], REVIEW:[], DONE:[] }

        //le pasamos como parámetro cada postit dl state, y lo preparamos para (1) poder arrastrarlo, (2) poder editarlo y actualizar cambios en state, y (3) añadirle botón delete
        let template = postit => (  
            <article className="post" key={postit.id} draggable onDragStart={(e) => e.dataTransfer.setData("id", postit.id)}>
                <textarea defaultValue={postit.text} onChange={this.handleChange} onBlur={() => this.handleBlur(postit.id)} />
                <button className="delete-button" onClick={() => this.handleRemovePostit(postit.id)}><i className="far fa-trash-alt"></i></button>
            </article> 
        )

        //cogemos cada postit del state, y tras pasarlo como parámetro a let template, los pasamos a cada array de let postits q coincida con el postit.status
        this.state.postits.forEach(post => postits[post.status].push(template(post)))  

        //renderizamos el inputform, las 4 columnas (Status), conteniendo los postits correspondientes dl let postits, y actualizamos con el atributo update, q llama la funcion update (ésta llama la modifi)
        return <div className="postits-container">
                <InputForm onSubmit={this.handleSubmit} update={this.update}/>
                <div className="postits-content">
                    <Status name="TODO" postits={postits.TODO} update={this.update}/>
                    <Status name="DOING" postits={postits.DOING} update={this.update}/>
                    <Status name="REVIEW" postits={postits.REVIEW} update={this.update}/>
                    <Status name="DONE" postits={postits.DONE} update={this.update}/>
                </div>
        </div>
    }
}

export default Postits
