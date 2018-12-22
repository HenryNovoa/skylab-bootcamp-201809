import React from 'react'
import { Button } from "mdbreact";

function Landing(props) {
    return <section className="landing-page">
        <Button onClick={props.onRegisterClick}>Register</Button> <Button onClick={props.onLoginClick}>Login</Button>
    </section>
}

export default Landing