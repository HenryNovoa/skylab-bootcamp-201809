import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import logic from './logic'

class App extends Component {

    state={
        loggedIn:false,
        user:''
    }

    handleLoginClick = () => this.props.history.push('/login')

    handleRegisterClick = () => this.props.history.push('/register')

    handleLoggedIn = () => {
        this.setState({loggedIn:true})
        this.getUser()
    }

    getUser(){
        logic.retrieveUser()
            .then(user => { this.setState({ user }) })
            .then(()=> console.log(this.state.user))
    }


    render() {

        return <div className="body">
            <Route exact path="/" render={() => <Navbar onLoginClick={this.handleLoginClick} onRegisterClick={this.handleRegisterClick} isLoggedIn={this.state.loggedIn}/>} />

            <Route path="/register" render={() => !logic.loggedIn ? <Register  history={this.props.history}/> : <Redirect to="/" />} />

            <Route path="/login" render={() => !logic.loggedIn ? <Login history={this.props.history} isLoggedIn={this.handleLoggedIn}/> : <Redirect to="/" name={this.state.user.name} />} />

            {/* <Route path="/profile" render={() => !logic.loggedIn ? <Profile /> : <Redirect to="/profile" />} /> */}

            <Home />
        </div>
    }
}

export default withRouter(App)
