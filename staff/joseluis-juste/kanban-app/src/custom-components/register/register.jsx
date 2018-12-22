import React, { Component } from 'react';
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception'

class Register extends Component {

    state = { name: "", surname: "", email: "", phone: "", username: "", password: "", validationErrors: {}, flashMessage:"", showFlashMessageError:false, showFlashMessageOk:false }

    constructor(props) {
        super(props)
        this.serviceBackend = new ServiceBackEnd()
    }


    handleRegisterSubmit = () => {

        let user = {}
        user.name = this.state.name
        user.surname = this.state.surname
        user.email = this.state.email
        user.phone = this.state.phone
        user.username = this.state.username
        user.password = this.state.password

        this.serviceBackend.registerUser(user).then(res => {
            this.setState({showFlashMessageOk:true, flashMessage:"Account created correctly..."}, () => {
                
                setTimeout(()=>{
                    this.setState({showFlashMessageOk:false, validationErrors:{}, showFlashMessage:false, name:"", surname:"", email:"", phone:"", username:"", password:""})
                }, 3000)
            })
        }).catch(err => {

            if (err instanceof ValidationError) {
                let errors = {}
                err.validationErrors.forEach(error => {
                    errors[error.field] = error.message
                });
                this.setState({flashMessage:err.message, showFlashMessageError:true, validationErrors: errors }, () =>{

                    setTimeout(()=>{
                        this.setState({showFlashMessageError:false})
                    }, 3000)

                })
            } else {
                this.setState({flashMessage:err.error, showFlashMessageError:true}, () =>{

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
                 {this.state.showFlashMessageOk && <div className="alert alert-success" role="alert">
                    {this.state.flashMessage}
                </div>}
                {this.state.showFlashMessageError && <div className="alert alert-danger" role="alert">
                    {this.state.flashMessage}
                </div>}
                <div className="form-group">
                    <label>Name</label>
                    <input value = {this.state.name} onChange={(ev) => { this.setState({ name: ev.target.value }) }} type="text" className="form-control" placeholder="Enter name" />
                    <small class="text-danger">{this.state.validationErrors["name"]}</small>
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input value = {this.state.surname} onChange={(ev) => { this.setState({ surname: ev.target.value }) }} type="text" className="form-control" placeholder="Enter surname" />
                    <small class="text-danger">{this.state.validationErrors["surname"]}</small>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input value = {this.state.email} onChange={(ev) => { this.setState({ email: ev.target.value }) }} type="email" className="form-control" placeholder="Enter mail" />
                    <small class="text-danger">{this.state.validationErrors["email"]}</small>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input value = {this.state.phone} onChange={(ev) => { this.setState({ phone: ev.target.value }) }} type="phone" className="form-control" placeholder="Enter phone" />
                    <small class="text-danger">{this.state.validationErrors["phone"]}</small>
                </div>
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
                <button onClick={this.handleRegisterSubmit} type="submit" className="btn btn-primary">Send</button>
            </form>
        );
    }
}

export default Register;
