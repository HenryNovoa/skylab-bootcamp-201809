import React, { Component } from 'react';
import Header from './header/header'
import Home from './home/home'
import Landing from './landing/landing'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Register from '../custom-components/register/register'
import ServiceBackEnd from '../logic/Service'


class App extends Component {

  state = {hideRegisterLink:false}

  constructor(props) {
    super(props)
    this.serviceBackend = new ServiceBackEnd()

    if (this.serviceBackend.isLogged())
    {
        this.props.history.push("/landing")
    }
  }
  
  render() {
    return (
        <section className="main-app">
             <Header></Header>
             <Route exact path="/" render={() => <Home></Home>} />
             <Route path="/landing" render={() => <Landing></Landing>} />
             <Route exact path="/register" render={() => <Register></Register>} />
        </section>       
    );
  }
}

export default withRouter(App)
