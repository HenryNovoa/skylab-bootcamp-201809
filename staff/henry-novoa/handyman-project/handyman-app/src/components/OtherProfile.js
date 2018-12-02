import React, { Component } from 'react'
import PreJob from './PreJob'
import NavBar from './NavBar'
import logic from '../logic'
import Rating from './Rating'



class OtherProfile extends Component {
    state ={mySession: false ,userId:this.props.userId , jobsPosted:[],jobsDone:[], user: '', postsLiked: [], grid: [], liked: false,averageRating:'' }

    componentDidMount(){
        
        const isDone = 'DONE'
        try {
            logic.retrieveUser(this.state.userId)
                .then(user =>{
                     logic.retrieveJobsFromUser(user.id)
                        .then((jobs)=>{
                            this.setState({user:user})
                        
                            this.setState({jobs:jobs})
                
                            jobs.forEach(job =>{
                                if(job.user === this.state.userId)  this.setState({ jobsPosted: [...this.state.jobsPosted, job] }) 
                                if(job.status === isDone && job.assignedTo === this.state.userId ) this.setState({jobsDone : [...this.state.jobsDone,job]})
                            })    
                           
                        })
                    })


        } catch ({ message }) {
            this.setState({ error: message })
        }
    }
    handleOnViewJobClick = (userId, jobId) => {
        
        this.props.onViewJobClick(userId, jobId)
    }

      //NavBar functions
      handleOnHomeClick = () => {

        this.props.onHomeClick()
    }

    handleLogoutClick = () => {

        this.props.onLogoutClick()

    }

    handleProfileClick = () => {

        this.props.onProfileClick()
    }

    handleCreateJobClick = event => {
        event.preventDefault()

        this.props.onCreateJobClick()
    }





    render() {

        const {userId,user} = this.state
        return <div className="div-home">
            <NavBar onLogout={this.handleLogoutClick} onCreateJobClick={this.handleCreateJobClick} onProfileClick={this.handleProfileClick} />
            <section className="profile">
                <div className="profile__center">
                    <div className="profile__img">
                        <img className="profile__img-small" src={'../../public/images/mario.jpg'}></img>
                    </div>
                    <div className="profile__info">
                        <h4>Username</h4>
                        <p>{user && user.username}</p>
                        <h4>Name</h4>
                        <p>{user && user.name}</p>
                        <div className="info__stadistics">
                            {/* <p className="stadistics">Posts {this.state.posts ? this.state.posts.length : '0'}</p>
                            <p className="stadistics">Follows {this.state.follows ? this.state.follows.length : '0'}</p>
                            <p className="stadistics">Followers {this.state.followers ? this.state.followers.length : '0'}</p> */}
                        </div>
                    </div>
                </div>
            </section>
            <div className="gallery">
                <i onClick={this.handleGallery} className="fas fa-th icon icon__profile">Posted jobs</i> 
            </div>
             <section className="gallery">
             {this.state.jobs && this.state.jobsPosted.map(job => <PreJob onViewJobClick={this.handleOnViewJobClick} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />)}
            </section>
            <div className="gallery">
                <i onClick={this.handleGallery} className="fas fa-th icon icon__profile">Jobs completed</i> 
            </div>
             <section className="gallery">
                {this.state.jobs && this.state.jobsDone.map(job =><div> <PreJob onViewJobClick={this.handleOnViewJobClick} key={job.id} id={job.id} photo={job.photo} userId={job.user} location={job.location} title={job.title} budget={job.budget} /> 
                <Rating ratingText={job.ratingText} ratingNumber={job.rating}/></div>)}
            </section>
        </div>
    }
}



export default OtherProfile