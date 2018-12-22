import React from 'react'
import Navbar from './Navbar'

function Landing(props) {
    return <div className="background">
        <Navbar />
        <section className="landing-buttons-sec">
            <button className="landing-button" onClick={props.onRegisterClick}>Register</button> or <button className="landing-button" onClick={props.onLoginClick}>Login</button>
        </section>
    </div>
}

export default Landing