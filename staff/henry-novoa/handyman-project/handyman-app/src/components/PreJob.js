import React, { Component } from 'react'

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';


    function PreJob(props) {
      
        const photo = props.photo
        const defaultImage="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" 


        return<div className='prejob'>
        <Card body outline color="secondary">
          <CardImg top width="100%" src={photo? photo : defaultImage} alt="Card image cap" />
          <CardBody>
            <CardTitle>{props.title}</CardTitle>
            <CardSubtitle className='prejob__subtitle__text'>Budget:{props.budget}</CardSubtitle>
            <br/>
            <CardSubtitle>Location:{props.location}</CardSubtitle>
            <Button onClick={()=>props.onViewJobClick(props.userId,props.id)}>View Job</Button>
          </CardBody>
        </Card>
      </div>
    }    

// function PreJob(props) {
   
//     return  <div> 
//     <p className="prejob">{props.title}</p>
//     <p className="prejob">{props.budget}</p>
//     <p className="prejob">{props.location}</p>
//     <button onClick={()=>props.onViewJobClick(props.userId,props.id)}>View Job</button>

//     </div>
// }

export default PreJob