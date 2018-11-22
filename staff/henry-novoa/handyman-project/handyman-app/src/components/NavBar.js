import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Job from './Job'
import CollaboratorModal from './CollaboratorModal'




function NavBar(props) {
    return <div className="navbar">
        <section className="navbar__header">
            <div className="logo"><i onClick={props.onHomeClick} className="fas fa-hammer"></i></div>
            <h1 className="navbar__title">HandyMan App</h1>
            <div className="navbar__menu">
                <i onClick={props.onPost} className="menu__button ">Create Job</i>
                <i onClick={props.onProfile} className="menu__button ">Profile</i>
                <i onClick={props.onLogout} className="menu__button ">Log out</i>
            </div>
        </section>
    </div>
}


export default NavBar