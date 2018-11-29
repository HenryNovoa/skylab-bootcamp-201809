import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Job from './Job'
import CollaboratorModal from './CollaboratorModal'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';



function NavBar(props) {
         
   
   return  <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">HandyMan</NavbarBrand>
        <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink href="#" onClick={props.onCreateJobClick}>Create Job</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={props.onProfileClick}>Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={props.onLogout}>Logout</NavLink>
          </NavItem>
        </Nav>
    </Navbar>
  </div>
    
    
    // <div className="navbar">
    //     <section className="navbar__header">
    //         <div className="logo"><i onClick={props.onHomeClick} className="fas fa-hammer"></i></div>
    //         <h1 className="navbar__title">HandyMan App</h1>
    //         <div className="navbar__menu">
    //             <i onClick={props.onPost} className="menu__button ">Create Job</i>
    //             <i onClick={props.onProfileClick} className="menu__button ">Profile</i>
    //             <i onClick={props.onLogout} className="menu__button ">Log out</i>
    //         </div>
    //     </section>
    // </div>

}

export default NavBar