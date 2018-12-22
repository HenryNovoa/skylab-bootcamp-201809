import React, { Component } from 'react';
import ModalExample from '../modal-postit-form/modalpostitform'
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception';
import NotValidSession from '../../logic/exceptions/notvalidsessionexception';

class Card extends Component {

    state = { id:this.props.id, content: this.props.content, showModal:false}

    constructor(props){
        super(props)
        this.serviceBackend = new ServiceBackEnd()    
       
    }

    handleShowModalForm = () =>{
       
        this.state.showModal = !this.state.showModal
        this.setState({showModal: this.state.showModal})
    }

    handleEditPosit = (content) => {

        this.serviceBackend.findPostit(this.state.id).then(res => {
            
                this.serviceBackend.updatePostit(res.data.id, res.data.state, content).then(res => {
                   this.setState({content:content, showModal:false})
                }).catch(err => {
                    if (err instanceof ValidationError) {
                        this.setState({showModal:false})
                        alert(err.message)
        
                    } else if (err instanceof NotValidSession) {
                        this.props.history.push("/")
                    } else {
                        this.setState({showModal:false})
                        alert(err.message)
                    }
                })
            
        }).catch(err => {

            if (err instanceof ValidationError) {
                this.setState({showModal:false})
                alert(err.message)

            } else if (err instanceof NotValidSession) {
                this.props.history.push("/")
            } else {
                this.setState({showModal:false})
                alert(err.message)
            }

        })
    }


    render() {
        return (
            <article draggable="true" onDragStart ={this.props.onDrag} id={this.state.id} class="postit">
                <ModalExample onEditPostit={this.handleEditPosit} toggle = {this.handleShowModalForm} showModal = {this.state.showModal} oldmessage={this.state.content} isOpen="true"></ModalExample>
                <a onClick={() => this.props.onDeletePostIt(this.state.id)} className="icon-x"></a>
                <p onClick={this.handleShowModalForm}>
                    {this.state.content}
                </p>
            </article>
        );
    }
}

export default Card;
