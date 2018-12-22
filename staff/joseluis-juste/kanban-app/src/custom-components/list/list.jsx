import React, { Component } from 'react';
import Card from '../card/card'
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception';
import NotValidSession from '../../logic/exceptions/notvalidsessionexception';
import {withRouter} from 'react-router-dom'


class List extends Component {

    state = { classMessage: "", message: "", name: this.props.name, showFormAddCard: "", cardContent: "", cards: [] }

    constructor(props) {
        super(props)
        this.serviceBackend = new ServiceBackEnd()
        this.loadPostits()

    }

    loadPostits = () =>{

        this.serviceBackend.getUserPostits().then(res => {
            
            res.data.forEach(card => {

                if (this.state.name === card.state)
                    this.state.cards.push(card)

            })
            this.setState({cards:this.state.cards})              
            
        }).catch(err => {

            if (err instanceof NotValidSession) {
                this.props.history.push("/")
            } else {
                alert(err.message)
            }

        })
    }

    handleshowFormAddCard = () => {

        this.state.showFormAddCard = !this.state.showFormAddCard ? "height-form-card" : ""
        this.setState({ showFormAddCard: this.state.showFormAddCard })
    }

    handleAddCard = () => {

        this.serviceBackend.addPostit(this.state.name, this.state.cardContent).then(res => {
            this.state.cards.push({ id: res.data.id, content: res.data.content })
            this.setState({ cardContent: "", cards: this.state.cards, classMessage: "text-success", message: "Postit added correctly..." }, () => {
                setTimeout(() => {
                    this.setState({ message: "", classMessage: "", showFormAddCard: "" })

                }, 2000)

            })
        }).catch(err => {

            if (err instanceof ValidationError) {
                this.setState({ classMessage: "text-danger", message: err.validationErrors[0].message }, () => {

                    setTimeout(() => {
                        this.setState({ message: "", classMessage: "", cardContent: "", showFormAddCard: "" })
                    }, 2000)
                })

            } else if (err instanceof NotValidSession) {
                this.props.history.push("/")
            } else {
                this.setState({ classMessage: "text-danger", message: err.message }, () => {

                    setTimeout(() => {
                        this.setState({ message: "", classMessage: "", cardContent: "" })
                    }, 2000)
                })
            }

        })

    }

    handleCardContentChange = (ev) => {

        this.state.cardContent = ev.target.value
        this.setState({ cardContent: this.state.cardContent })

    }

    handleCardDrag = (ev) => {
        
        ev.dataTransfer.setData("text", ev.target.id)
        
    }

    handleDrop = (ev) => {
       
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));       
        this.serviceBackend.findPostit(data).then(res => {
            
            if (res.data.state !== this.state.name){

                this.serviceBackend.updatePostit(res.data.id, this.state.name, res.data.content).then(res =>{
                   
                }).catch(err =>{

                    if (err instanceof ValidationError) {
                        alert(err.message)
        
                    } else if (err instanceof NotValidSession) {
                        this.props.history.push("/")
                    } else {
                        alert(err.message)
                    }
                })
            }
        }).catch(err => {

           
             if (err instanceof NotValidSession) {
                this.props.history.push("/")
            } else {
                alert(err.message)
            }

        })
        
    }

    handleDeletePostIt = (id) =>{

        this.serviceBackend.deletePosIt(id).then(res =>{
            
            const index = this.state.cards.findIndex( card => {
                
                return card.id === id
                
            })
            this.state.cards.splice(index, 1)
            this.setState({cards:this.state.cards})

        }).catch(err => {

           

            if (err instanceof NotValidSession) {
                this.props.history.push("/")
            } else {
                alert(err.message)
            }

        })
    }

    handleDragOver = (ev) => {

        ev.preventDefault();
    }


    render() {
        return (
            <section onDrop={this.handleDrop} onDragOver={this.handleDragOver} className="list">
                <h3 className="list__title">{this.state.name}</h3>
                {  
                    this.state.cards.map((card) => 
                       
                       <Card onDeletePostIt={this.handleDeletePostIt} onDrag={this.handleCardDrag} id={card.id} content={card.content}></Card>
                    )
                    
                }
                <form onSubmit={(ev) => ev.preventDefault()} className={`form-addcard ${this.state.showFormAddCard}`}>
                    <small class={this.state.classMessage}>{this.state.message}</small>
                    <textarea value={this.state.cardContent} onChange={(ev) => this.handleCardContentChange(ev)}></textarea>
                    <button onClick={this.handleAddCard} className="btn btn-success btn-sm">Add card</button>
                </form>
                <span onClick={this.handleshowFormAddCard} className="add-card">+ Add Card</span>
            </section>
        );
    }
}

export default withRouter(List)
