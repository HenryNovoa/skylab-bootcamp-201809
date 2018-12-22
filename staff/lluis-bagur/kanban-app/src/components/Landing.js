import React from 'react'

function Landing(props) {
    return <section className="landing">

        {/* .................... HEADER .................. */}

        <div className="header">
            <div>
                <div className="logo"></div>
            </div>
            <div className="buttons">
                <button className="header__button" onClick={props.onRegisterClick}>Register</button>
                <button className="header__button" onClick={props.onLoginClick}>Login</button>
            </div>
        </div>

        {/* .................... BODY .................. */}

        <div className="body">

        </div>


    </section>
}

export default Landing