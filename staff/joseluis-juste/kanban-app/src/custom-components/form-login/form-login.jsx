import React, { Component } from 'react';
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception'
import { Route, withRouter, Redirect } from 'react-router-dom'

class FormLogin extends Component {

    state = {username: "", password: "", validationErrors: {}, flashMessage:"", showFlashMessageError:false}

    constructor(props) {
        super(props)
        this.serviceBackend = new ServiceBackEnd()
    }

    handleLoginSubmit = () => {

        this.serviceBackend.loginUser(this.state.username, this.state.password).then(res => {
            this.setState({validationErrors:{}, username:"", password:""}, () =>{
                this.props.history.push('/landing')
            })

        }).catch(err => {

            if (err instanceof ValidationError) {
                let errors = {}
                err.validationErrors.forEach(error => {
                    errors[error.field] = error.message
                });
                debugger
                this.setState({flashMessage:err.message, showFlashMessageError:true, validationErrors: errors }, () =>{

                    setTimeout(()=>{
                        this.setState({showFlashMessageError:false})
                    }, 3000)

                })
            } else {
                this.setState({validationErrors:{}, flashMessage:err.message, showFlashMessageError:true}, () =>{

                    setTimeout(()=>{
                        this.setState({showFlashMessageError:false})
                    }, 3000)

                })
            }

        })
    }


    render() {
        return (
            <form onSubmit={(ev) => ev.preventDefault()} className="login-form">
                {this.state.showFlashMessageError && <div className="alert alert-danger" role="alert">
                    {this.state.flashMessage}
                </div>}
                <div className="form-group">
                    <label>Username</label>
                    <input value = {this.state.username} onChange={(ev) => { this.setState({ username: ev.target.value }) }} type="text" className="form-control" placeholder="Enter username" />
                    <small class="text-danger">{this.state.validationErrors["username"]}</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value = {this.state.password} onChange={(ev) => { this.setState({ password: ev.target.value }) }} type="password" className="form-control" placeholder="Enter password" />
                    <small class="text-danger">{this.state.validationErrors["password"]}</small>
                </div>
                <button onClick={this.handleLoginSubmit} type="submit" className="btn btn-primary">Send</button>
            </form>
        );
    }
}

export default withRouter(FormLogin)
