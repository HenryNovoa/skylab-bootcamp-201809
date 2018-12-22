import React, { Component } from 'react';

import List  from '../list/list'

class Landing extends Component {

  render() {
    return (
       <section className="board">
           <List name="TODO"></List>
           <List name="DOING"></List>
           <List name="REVIEW"></List>
           <List name="DONE"></List>
       </section>       
    );
  }
}

export default Landing;
