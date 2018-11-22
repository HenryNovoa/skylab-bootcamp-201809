import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Job from './Job'
import CollaboratorModal from './CollaboratorModal'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import PreJob from './PreJob'


class Home extends Component {
    state = { posts:[], jobs: [], liked: [], results: [], nameSearch: '',error : null }

    /* componentDidMount() {

          try{
         logic.listAllJobs()
            .then(jobs => this.setState({ jobs }))
            .catch(err => this.setState({error = err.message}))
            }
         // TODO error handling!
         logic.listLikes()
         logic.listPosts()
         logic.listComments()
     
    }*/

    handleUserSearch = name =>{   
        this.props.onUserSearch(name)
    }
    
    handleCreateJobClick = event =>{
        event.preventDefault()

        this.props.onCreateJobClick()
    }

    handleJobSearch

    handleOnViewJobClick = (jobId) =>{
        logic.getJob(JobId)
    }





    render() {
        return <div className="home">
             <NavBar/>
             <SearchBar/>
            <button onClick={this.handleCreateJobClick}>Create a new Job</button>

            <section className="home__post">
                {this.state.jobs.map(job => <PreJob onViewJobClick={this.handleOnViewJobClick} key={job.id} id={job.id} location={job.location} title={job.title} budget={job.budget} />)}
            </section>
        </div>
    }
}

export default Home
