import React, { Component } from 'react'
import logic from '../logic'


class Selector extends Component {

    state = {
        status: this.props.status
    }

    handleSelectionChange = event => {
        event.preventDefault()

        // this.setState({ status:event.target.value })
        this.props.getStatusFromSelector(event.target.value)
    }

    render() {
        return <select className='selector' onChange={this.handleSelectionChange}>
            {(!this.props.noMove) && <option >Move to</option>}
            <option value="TODO">TODO</option>
            <option value="DOING">DOING</option>
            <option value="REVIEW">REVIEW</option>
            <option value="DONE">DONE</option>
        </select>
    }
}

export default Selector