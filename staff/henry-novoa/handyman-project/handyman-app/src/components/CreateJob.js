import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Job from './Job'
import CollaboratorModal from './CollaboratorModal'
import NavBar from './NavBar'
import SearchBar from './SearchBar'


class CreateJob extends Component {
    state = {  pictures: [], title:'', budget: '', description: '', location: '',tags:[],contact:'' }

    // componentDidMount() {
    //     logic.listAllJobs()
    //     .then(jobs => this.setState({ jobs }))
    //     // TODO error handling!
    //     logic.listLikes()
    //     logic.listPosts()
    //     logic.listComments()

    // }

    handleBudgetChange = event => {
        const budget = event.target.value

        this.setState({ budget })
    }
    handleTitleChange = event => {
        const title = event.target.value

        this.setState({ title })
    }
   
    handleDescriptionChange = event => {
        const description = event.target.value

        this.setState({ description })
    }
   
    handleLocationChange = event => {
        const location = event.target.value

        this.setState({ location })
    }

    handleTagChange = event => {
        const tagsNonArray = event.target.value

        const tags = tagsNonArray.split(' ')

        this.setState({ tags })
    }

    handleContactChange = event => {
        const contact = event.target.value

        this.setState({ contact })
    }

    handleCreateJob = event => {
        event.preventDefault()

        const budget = this.state.budget

        const contact = this.state.contact
        
        const location = this.state.location

        const tags = this.state.tags

        const description = this.state.description

        const title = this.state.title

        //Add here modal to add pic

        this.props.CreateJob({title,budget,contact,location,tags,description})


    }



    handlePictureUpload = (event) =>{
        event.preventDefault()
        const image = event.target.value

        logic.insertPhotoToJob(image)

        
   
    }

    handleOnHomeClick=()=>{
       
        this.props.onHomeClick()


    }



    render() {
        return <div className="create">
            <NavBar onHomeClick={this.handleOnHomeClick}/>
            <form  onSubmit={this.handlePictureUpload}>
            <label for="item">Add image</label>
                <input type="file" accept="image/*" aria-label="select file to upload"/>
                    <button type="submit">Submit</button>
            </form>    
            <form onSubmit={this.handleCreateJob}>   
                <label>Title</label>
                <input value={this.state.title} placeholder="Write text here..." onChange={this.handleTitleChange} />
                
                <label>Budget</label>
                <input value={this.state.budget} placeholder="Write text here..." onChange={this.handleBudgetChange} />
                
                <label>Description</label>
                <input value={this.state.description} placeholder="Write text here..." onChange={this.handleDescriptionChange} />
                
                <label>Location</label>
                <input value={this.state.location} placeholder="Write text here..." onChange={this.handleLocationChange} />
                
                <label>Tags</label>
                <input value={this.state.tags} placeholder="Write text here..." onChange={this.handleTagChange} />
                
                <label>Contact</label>
                <input value={this.state.contact} placeholder="Write text here..." onChange={this.handleContactChange} />
                
                <button type="submit">Submit</button>
            </form>

            </div>
            }
        }
        
        export default CreateJob
