import React from 'react'

function Landing(props) {
    return <section className='landing'>
        <div className='landing__options'>
            <div className='options__container'>
                <button onClick={props.onRegisterClick}>Register</button> or <button onClick={props.onLoginClick}>Login</button>
            </div>
        </div>
    </section>
}

export default Landing