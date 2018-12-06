import React, { Component } from 'react'
import logic from '../../logic'
import Job from '../Job/Job'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import PreJob from '../PreJob/PreJob'
import Footer from '../Footer/Footer'


class Home extends Component {
    state = {availableJobs:true,jobsAvailable:[] ,jobs: [], liked: [], results: [], nameSearch: '', error: null }

    componentDidMount() {
        const isDone = 'DONE'
        this.handleMount()
          

    }

    handleMount = () => {
        try {
            return logic.listAllJobs()
                .then(jobs => {
                    return this.setState({ jobs })
                })
                .catch(err => this.setState({ error: err.message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleUserSearch = name => {
        this.props.onUserSearch(name)
    }

    handleOnCitySearch = city => {

        this.handleMount()
            .then(() => {


                const cityToSearch = city
                const allCities = 'all'
                const isDone='DONE'
                debugger
                
                const searchedJobs = this.state.jobs.filter(job => {
                    if (cityToSearch === allCities) return job

                    if (job.location === cityToSearch) return job
                })
                const jobsAvailable = searchedJobs.filter(job=> job.status !== isDone)
                
                if (!jobsAvailable.length) this.setState({availableJobs:false}) 
                else{
                    this.setState({availableJobs:true})  
                }
                this.setState({ jobs: searchedJobs })



            })


    }

    handleOnViewJobClick = (userId, jobId) => {

        this.props.onViewJobClick(userId, jobId)
    }


    //Navbar functions
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

    handleHomeClick = () => {
        this.props.onHomeClick()
    }



    render() {

        const isDone = 'DONE'

        return<div className='container'> 
        <div className="home has-background-white-ter">
            <NavBar onHomeClick={this.handleHomeClick} onLogout={this.handleLogoutClick} onCreateJobClick={this.handleCreateJobClick} onProfileClick={this.handleProfileClick} />
            <SearchBar onCitySearch={this.handleOnCitySearch} />


            <div className="container has-gutter-top-bottom ">
                <h1 className="title is-2">Available Jobs</h1>
                {/* Iterates through data (jobs) */}
                <div className="columns is-multiline">
                    {(this.state.jobs.length && this.state.availableJobs) ? this.state.jobs.map(job => {
                        if(job.status !== isDone) return <div className="column is-4 has-shadow">
                            <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />
                        </div>
                    }) : <h2>Oops, there seems to be no results for your query</h2>}

                </div>
                <Footer />
            </div>


        </div>
        </div>
    }
}

export default Home
