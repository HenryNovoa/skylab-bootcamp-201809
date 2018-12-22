import React from 'react'

function Landing(props) {
    return <div className="landing__container"> 
        <section className="landing__buttons">
        <img src="https://res.cloudinary.com/skylabcoders/image/upload/v1541952996/pintegram/images.png"></img>
            <p>Kanban App</p>
            <button onClick={props.onRegisterClick}>Register</button> or <button onClick={props.onLoginClick}>Login</button>
        </section>
    </div>
}

export default Landing