import React, { Component } from 'react'


function PreJob(props) {
    return  <div> 
    <p className="prejob">{props.title}</p>
    <p className="prejob">{props.budget}</p>
    <p className="prejob">{props.location}</p>
    <button onClick={()=>props.onViewJobClick(props.id)}>View Job</button>

    </div>
}

export default PreJob