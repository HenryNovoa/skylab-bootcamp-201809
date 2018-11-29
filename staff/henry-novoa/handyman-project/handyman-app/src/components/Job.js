import React, { Component } from 'react'
import logic from '../logic'
import { throws } from 'assert';
import Error from './Error'
import CollaboratorModal from './CollaboratorModal'
import NavBar from './NavBar'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardHeader, CardFooter, Button
} from 'reactstrap';


class Job extends Component {
    state = { job: '', error: null, requestedBy: [], myJob: false, toAssign: '', assignedTo: '', requested: false, modal: false, done: false, assigned: false }


    componentDidMount() {
        this.handleMount()
    }

    handleMount = () => {

        const statusDone = 'DONE'
        if (logic._userId === this.props.userId) this.setState({ myJob: true })

        logic.getJob(this.props.userId, this.props.jobId)
            .then(job => this.setState({ job }))
            .then(() => {
                if (this.state.job.status === statusDone) this.setState({ done: true })
                if (this.state.job.assignedTo === logic._userId) this.setState({ assigned: true })
                if (this.state.job.requestedBy) {
                    this.state.job.requestedBy.forEach((requestId) => {
                        if (requestId === logic._userId) this.setState({ requested: true })

                        logic.retrieveUser(requestId)
                            .then(user => this.setState({ requestedBy: [...this.state.requestedBy, user] }))
                    })
                }
            }).then(() => {
                if (this.state.job.assignedTo) {
                    logic.retrieveUser(this.state.job.assignedTo)
                        .then(user => this.setState({ assignedTo: user }))
                }
            })


    }


    handleBackClick = () => this.props.onBackClick()


    handleRequestJob = () => this.props.onRequestJob(this.props.userId, this.props.jobId)
        .then(() => this.setState({ requested: true }))




    handleRequestChange = event => {
        const toAssign = event.target.value

        this.setState({ toAssign })
    }

    handleAssignJob = () => this.props.onAssignJob(this.state.toAssign, this.props.jobId)
        .then(() => this.handleMount())


    handleRemoveClick = () =>
        this.props.onRemoveJob(this.props.jobId)

    handleFinishedClick = event => {

        this.setState({ modal: true })
    }
    handleOnCloseModal = () => {

        this.setState({ modal: false })
    }

    handleRateJob = (rating, text) => {

        try {
            this.props.onRateJob(rating, text, this.props.jobId)
            this.setState({ modal: false })
        } catch ({ message }) {
            this.setState({ error: message })
        }

    }

    handleProfileView = () => {

        this.props.onProfileView(this.state.toAssign)

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


        const { job, myJob, done, requested, assigned } = this.state
        const { error } = this.state
        const jobIsDoing = 'DOING'
        const jobIsDone = 'DONE'
        const photo = job.photo
        const defaultPicture = "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"


        return <div className='job'>
            <NavBar onLogout={this.handleLogoutClick} onCreateJobClick={this.handleCreateJobClick} onProfileClick={this.handleProfileClick} />
            <div>


                <Card body outline color="secondary">
                    <CardBody>
                        <CardHeader tag="h3">{job && job.title}</CardHeader>
                        <CardSubtitle>{job && job.budget}</CardSubtitle>
                        <CardSubtitle>{job && job.location}</CardSubtitle>
                    </CardBody>
                    <img width="100%" src={photo ? photo : defaultPicture} alt="Card image cap" />
                    <CardBody>
                        <CardText>{job && job.description}</CardText>

                        <CardSubtitle>Status: {job && job.status}</CardSubtitle>

                        <CardSubtitle>Rating {job && job.rating}</CardSubtitle>

                        {(myJob && job.status === jobIsDoing) ? <Button onClick={this.handleFinishedClick}>Mark as finished</Button> : null}
                        
                        <Button onClick={this.handleBackClick}>Home</Button>
                        
                        {(myJob && job.status !== jobIsDone) ? <Button onClick={this.handleRemoveClick}>Delete Job</Button> : null}
                       
                        {error && <Error message={error} />}

                        <CardFooter><div className='job__footer'> {myJob ? <select defaultValue="none" onChange={this.handleRequestChange}>
                           
                            <option disabled={true} value="none">Users who requested job</option>

                            {this.state.requestedBy.map(user => <option value={user.id}>{user.username}</option>)}
                        </select> : (!done && !requested) ? <button onClick={this.handleRequestJob}>Request Job</button> : (!assigned) ? <p>You have requested to do this job</p> : <p>You have been assigned this job</p>}
                            
                            {myJob ? <p>Assigned to: {job && this.state.assignedTo.username}</p> : null}
                            
                            {(done && assigned) ? <p>You have completed this job</p> : null}
                            
                            {(myJob && !done) ? <div><Button onClick={this.handleAssignJob}>Assign Job</Button><Button onClick={this.handleProfileView}>View Profile</Button></div> : null}
                        </div>
                        </CardFooter>
                    </CardBody>
                </Card>
                <CollaboratorModal modal={this.state.modal} onCloseModal={this.handleOnCloseModal} onRateJob={this.handleRateJob} />
            </div>

            <article className="post">
                {/* <div className='image__container'>
                <img src={job.photo}/>
                </div>

                <p>Title:{job && job.title}</p>

                <p>Budget:{job && job.budget}</p>
                <p>Description:{job && job.description}</p>
                <p>Location:{job && job.location}</p>
                <p>Status:{job && job.status}</p>

                <p>Rating:{job && job.rating}</p>
                {myJob ? <p>Assigned to: {job && this.state.assignedTo.username}</p> : null}
                {myJob ? <select defaultValue="none" onChange={this.handleRequestChange}>
                    <option disabled={true} value="none">Users who requested job</option>

                    {this.state.requestedBy.map(user => <option value={user.id}>{user.username}</option>)}
                </select> : (!done && !requested) ? <button onClick={this.handleRequestJob}>Request Job</button> : (!assigned) ? <p>You have requested to do this job</p> : <p>You have been assigned this job</p>}
                {(done && assigned) ? <p>You have completed this job</p> : null}
                {(myJob && !done) ? <div><button onClick={this.handleAssignJob}>Assign Job</button><button onClick={this.handleProfileView}>View Profile</button></div> : null} */}
                {/* <select onChange={this.handleCollaboratorChange} defaultValue="none">
                            <option disabled="true" value="none">Users who requested job</option>
                            {job && job.requestedBy.map(({ id}) => <option value={id}>{id}</option>)}={this.state.job.description}/> }
            </select> */}
                {/* <button onClick={() => this.props.onDeleteJob(this.props.id)}><i className="far fa-trash-alt"></i></button> */}

                {/* <select onChange={this.handleChangeStatus} defaultValue={this.props.status}><option value="TODO">TODO</option><option value="DOING">DOING</option><option value="REVIEW">REVIEW</option><option value="DONE">DONE</option></select> */}

                {/* <button onClick={this.handleAssignCollaborator}><i className="fas fa-share-alt"></i></button> */}


            </article>
        </div>
    }
}

export default Job