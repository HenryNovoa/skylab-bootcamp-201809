import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Job from './Job'
import CollaboratorModal from './CollaboratorModal'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import FileBase64 from "react-file-base64"
import Footer from './Footer'


class CreateJob extends Component {
    state = { pictures: [], title: '', budget: '', description: '', location: '', tags: [], contact: '', loading: false, photo: '' }



    getFiles = files => {
        this.setState({
            loading: false
        })
        this.uploadUserPhoto(files.base64)
    }


    uploadUserPhoto(photo) {
        logic.uploadUserPhoto(photo)
            .then(photo => {
                this.setState({
                    photo,
                    loading: true
                })
            })
            .catch(err => this.setState({ error: err.message }))

    }

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

    // handleTagChange = event => {
    //     const tagsNonArray = event.target.value

    //     const tags = tagsNonArray.split(' ')

    //     this.setState({ tags })
    // }

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
        const photo = this.state.photo
        debugger
        this.props.CreateJob({ title, budget, contact, location, tags, description, photo })




    }



    handlePictureUpload = (event) => {
        event.preventDefault()
        const image = event.target.value

        logic.insertPhotoToJob(image)



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

        return <div>
            <NavBar onLogout={this.handleLogoutClick} onCreateJobClick={this.handleCreateJobClick} onProfileClick={this.handleProfileClick} /> 
            <div className='image__container'>
                <img src={this.state.photo} />
            </div>
            <Form onSubmit={this.handleCreateJob}>
                <h2>Create Job</h2>

                <FormGroup>
                    <Label for="exampleEmail">Title</Label>
                    <Input onChange={this.handleTitleChange} type="text" name="text" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Budget</Label>
                    <Input onChange={this.handleBudgetChange} type="text" name="text" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Description</Label>
                    <Input onChange={this.handleDescriptionChange} type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Input onChange={this.handleLocationChange} type="select" name="select" id="exampleSelect">
                        <option value="none">Choose a city</option>
                        <option value='madrid'>Madrid</option>
                        <option value='barcelona'>Barcelona</option>
                        <option value='sevilla'>Sevilla</option>
                        <option value='bilbao'>Bilbao</option>
                        <option value='valencia'>Valencia</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Contact</Label>
                    <Input onChange={this.handleContactChange} type="text" name="text" id="exampleText" />
                </FormGroup>
                <Label for="exampleFile">File</Label>
                <FormGroup>
                    <FileBase64 className="input" multiple={false} onDone={this.getFiles} />
                    <FormText color="muted">
                        Please upload a picture if possible, it will be much easier for potencial canditates to judge and view your job
                   </FormText>
                    <div className='image__container'>
                        <img src={this.state.photo} />
                    </div>
                </FormGroup>

                <Button>Submit</Button>
            </Form>
                <Button onClick={this.props.onGoBackClick}>Back</Button>
            <Footer />
        </div>


        // return <div className="create">
        //     <NavBar onHomeClick={this.handleOnHomeClick}/>
        //     <form  onSubmit={this.handlePictureUpload}>
        //     <label for="item">Add image</label><br/>
        //         <input type="file" accept="image/*" aria-label="select file to upload"/>
        //             <button type="submit">Submit</button>
        //     </form>    
        //     <form onSubmit={this.handleCreateJob}>   
        //   done      <label>Title</label><br/>
        //         <input value={this.state.title} placeholder="Write text here..." onChange={this.handleTitleChange} />
        //         <br/>
        //     done    <label>Budget</label>
        //         <input value={this.state.budget} placeholder="Write text here..." onChange={this.handleBudgetChange} />

        //      done   <label>Description</label>
        //         <input value={this.state.description} placeholder="Write text here..." onChange={this.handleDescriptionChange} />

        //         <label>Location</label>
        //         <input value={this.state.location} placeholder="Write text here..." onChange={this.handleLocationChange} />

        //         <label>Tags</label>
        //         <input value={this.state.tags} placeholder="Write text here..." onChange={this.handleTagChange} />

        //         <label>Contact</label>
        //         <input value={this.state.contact} placeholder="Write text here..." onChange={this.handleContactChange} />

        //         <button type="submit">Submit</button>
        //     </form>

        //     </div>
    }
}

export default CreateJob
