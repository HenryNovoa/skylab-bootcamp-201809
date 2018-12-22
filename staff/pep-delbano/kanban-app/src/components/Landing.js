import React from 'react'

function Landing(props) {
    return <div className="container-landing">
            <h1 className="landing-title">POSTIT APP</h1>
            <section className="landing-buttons">
                <div>
                    <button className="btn btn-primary btn-lg" onClick={props.onRegisterClick}>Sign Up</button>
                </div>
                <div>
                    <button className="btn btn-primary btn-lg" onClick={props.onLoginClick}>Sign In</button>
                </div>
            </section>
    </div>
}

export default Landing