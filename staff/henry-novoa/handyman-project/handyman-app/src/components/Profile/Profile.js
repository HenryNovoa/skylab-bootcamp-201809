import React, { Component } from 'react'
import PreJob from '../PreJob/PreJob'
import NavBar from '../NavBar/NavBar'
import logic from '../../logic'
import Rating from '../Rating/Rating'
import { throws } from 'assert';

class Profile extends Component {
    state = { userId: logic.sessionId, jobsAssigned: [], jobsRequested: [], jobsPosted: [], jobsDone: [], user: '', averageRating: '',created:true,completed:false,requested:false,assigned:false }

    componentDidMount() {

        const isDone = 'DONE'

        try {

            logic.retrieveUser(this.state.userId)
                .then(user => {
                    logic.retrieveJobsFromUser(user.id)
                        .then((jobs) => {
                            this.setState({ user: user })
                            this.setState({ jobs: jobs })
                            jobs.forEach(job => {
                                const { userId } = this.state
                                if (job.user === userId) this.setState({ jobsPosted: [...this.state.jobsPosted, job] })
                                if (job.status !== isDone && job.assignedTo === userId) this.setState({ jobsAssigned: [...this.state.jobsAssigned, job] })
                                if ((job.status !== isDone) && (job.assignedTo !== userId) && (job.user !== userId)) {
                                    this.setState({ jobsRequested: [...this.state.jobsRequested, job] })
                                }
                                if (job.status === isDone && job.assignedTo === userId) this.setState({ jobsDone: [...this.state.jobsDone, job] })
                            })

                        })
                })


        } catch ({ message }) {
            this.setState({ error: message })
        }
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

    handleToggleClick= event =>{
        let toggle = document.querySelector(".nav-toggle")
         let menu = document.querySelector(".navbar-menu")
          
         toggle.classList.toggle("is-active")
          menu.classList.toggle("is-active") 
       }

    handleShowCreatedJobs=(event)=>{
        event.preventDefault()
        this._resetShowJobs()
        this.setState({created:true})
    }   

    handleShowCompletedJobs=(event)=>{
        event.preventDefault()
        this._resetShowJobs()
        this.setState({completed:true})
    }  
    handleShowRequestedJobs=(event)=>{
        event.preventDefault()
        this._resetShowJobs()
        this.setState({requested:true})
    }   
    handleShowAssignedJobs=(event)=>{
        event.preventDefault()
        this._resetShowJobs()
        this.setState({assigned:true})
    }   

    _resetShowJobs=()=>{
        this.setState({created:false,completed:false,requested:false,assigned:false})
    }

    handleOnViewJobClick = (userId, jobId) => {

        this.props.onViewJobClick(userId, jobId)
    }



    render() {

        const { user,created,completed,requested,assigned } = this.state
        return <div className='container'>
         <NavBar onHomeClick={this.handleOnHomeClick} onLogout={this.handleLogoutClick} onCreateJobClick={this.handleCreateJobClick} onProfileClick={this.handleProfileClick} />
        <div className='container columns'>
        
        <div className= 'column'>
        <h2 className='title'>Name:{user.name}</h2>
        </div>
        <div className='column'>
        <h2 className='title'>Surname:{user.surname}</h2>
        </div>
        <div className='column'>
        <h2 className='title'>Username:{user.username}</h2>
        </div>
        </div>
         <div class="tabs is-toggle is-fullwidth">
        <ul>
          <li className="" onClick={this.handleShowCreatedJobs}>
            <a>
              <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
              <span>Created jobs</span>
            </a>
          </li>
          <li className='' onClick={this.handleShowCompletedJobs}>
            <a>
              <span class="icon is-small"><i class="fas fa-check" aria-hidden="true"></i></span>
              <span>Jobs completed</span>
            </a>
          </li>
          <li onClick={this.handleShowRequestedJobs}>
            <a>
              <span class="icon is-small"><i class="fas fa-hammer" aria-hidden="true"></i></span>
              <span>Jobs requested</span>
            </a>
          </li>
          <li onClick={this.handleShowAssignedJobs}>
            <a>
              <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
              <span>Jobs assigned</span>
            </a>
          </li>
        </ul>
      </div>

       <div className="container has-gutter-top-bottom ">
              
                {/* Iterates through data (jobs) */}
                <h1 className="title is-2">Jobs</h1>
                <div className="columns is-multiline">
                
                    {this.state.jobs && created && this.state.jobsPosted.map(job => {
                         return   <div className="column is-4 has-shadow">
                            <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />
                        </div>})
                    }

                </div>

                <div className="columns is-multiline">
                
                {this.state.jobs && completed && this.state.jobsDone.map(job => {
                     return   <div className="column is-4 has-shadow">
                        <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />
                    <Rating ratingNumber={job.rating} ratingText={job.ratingText} />
                    </div>})
                }

            </div>
            <div className="columns is-multiline">
                
                    {this.state.jobs && requested && this.state.jobsRequested.map(job => {
                         return   <div className="column is-4 has-shadow">
                            <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />
                        </div>})
                    }

                </div>
                <div className="columns is-multiline">
                
                    {this.state.jobs && assigned && this.state.jobsAssigned.map(job => {
                         return   <div className="column is-4 has-shadow">
                            <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />
                        </div>})
                    }

                </div>
               
            </div>
        
         </div>
        
        
        
        // <div className="div-home">
        //     <NavBar onLogout={this.handleLogoutClick} onCreateJobClick={this.handleCreateJobClick} onProfileClick={this.handleProfileClick} />
        //     <section className="profile">
        //         <div className="profile__center">
        //             {/* <div className="profile__img">
        //                 <img className="profile__img-small" src={'../../public/images/mario.jpg'}></img>
        //             </div> */}
        //             <div className="profile__info">
        //                 <h4>Username</h4>
        //                 <p>{user && user.username}</p>
        //                 <h4>Name</h4>
        //                 <p>{user && user.name}</p>
        //                 <div className="info__stadistics">
        //                     {/* <p className="stadistics">Posts {this.state.posts ? this.state.posts.length : '0'}</p>
        //                     <p className="stadistics">Follows {this.state.follows ? this.state.follows.length : '0'}</p>
        //                     <p className="stadistics">Followers {this.state.followers ? this.state.followers.length : '0'}</p> */}
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        //     <div className="gallery">
        //         <i onClick={this.handleGallery} className="fas fa-th icon icon__profile">Posted jobs</i>
        //     </div>
        //     <section className="gallery">
        //         {this.state.jobs && this.state.jobsPosted.map(job => <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />)}
        //     </section>
        //     <div className="gallery">
        //         <i onClick={this.handleGallery} className="fas fa-th icon icon__profile">Jobs completed</i>
        //     </div>
        //     <section className="gallery">
        //         {this.state.jobs && this.state.jobsDone.map(job =>
        //             <div><PreJob onViewJobClick={this.handleOnViewJobClick} key={job.id} id={job.id} userId={job.user} photo={job.photo} location={job.location} title={job.title} budget={job.budget} />
        //                 <Rating ratingText={job.ratingText} ratingNumber={job.rating} /></div>
        //         )}
        //     </section>
        //     <div className="gallery">
        //         <i onClick={this.handleGallery} className="fas fa-th icon icon__profile">Jobs assigned</i>
        //     </div>
        //     <section className="gallery">
        //         {this.state.jobs && this.state.jobsAssigned.map(job => <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />)}
        //     </section>
        //     <div className="gallery">
        //         <i onClick={this.handleGallery} className="fas fa-th icon icon__profile">Jobs requested</i>
        //     </div>
        //     <section className="gallery">
        //         {this.state.jobs && this.state.jobsRequested.map(job => <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />)}
        //     </section>
        // </div>
    }
}



export default Profile