import React from 'react'

function Landing(props) {
    return <section className='landing'>
        <h1 className='landing_title'>Welcome to the Postit App!</h1>
        <button className='landing__button' onClick={props.onRegisterClick}>Register</button> or <button className='landing__button' onClick={props.onLoginClick}>Login</button>
    </section>
}

export default Landing