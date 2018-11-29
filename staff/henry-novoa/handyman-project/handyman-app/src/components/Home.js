import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Job from './Job'
import CollaboratorModal from './CollaboratorModal'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import PreJob from './PreJob'
import Footer from './Footer'


class Home extends Component {
    state = { jobs: [], liked: [], results: [], nameSearch: '', error: null }

    componentDidMount() {
        this.handleMount()
    
    }

    handleMount =()=>{
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
        .then(()=>{
            
            
            const cityToSearch = city
            const allCities = 'all'
            debugger
            const searchedJobs = this.state.jobs.filter(job => {
                if(cityToSearch === allCities) return job
                
                if(job.location === cityToSearch) return job
            })
            
            this.setState({jobs : searchedJobs})
            
            
            
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
    
    
    
    
    render() {
        return <div className="home">
            <NavBar onLogout={this.handleLogoutClick} onCreateJobClick={this.handleCreateJobClick} onProfileClick={this.handleProfileClick} />
            <SearchBar onCitySearch={this.handleOnCitySearch} />

            <section className="home__post">
                {   this.state.jobs.length ?this.state.jobs.map(job => <PreJob onViewJobClick={this.handleOnViewJobClick} photo={job.photo} key={job.id} id={job.id} userId={job.user} location={job.location} title={job.title} budget={job.budget} />
                ): <h2>Oops, there seems to be no results for your query</h2>}
            </section>
            <Footer />
        </div>
    }
}

export default Home
