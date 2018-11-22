import React, { Component } from 'react'

class SearchBar extends Component {

    
handleSubmit = event => {
    event.preventDefault()
}    
    
    render() {
    
    return <div className='searchbar'>
        <h3>Search for jobs</h3>
        <select className='searchbar__select' onChange={this.props.handleCityChange} defaultValue="none">
            <option disabled="true" value="none">Choose a city</option>
            <option>barcelona</option>
            <option>madrid</option>
            <option>sevilla</option>
            <option>valencia</option>
            <option>bilbao</option>
        </select>
        <form className="text-center" onSubmit={this.handleSubmit}>
            <input placeholder="Write tags here..." onChange={this.handleInput} />

            <button type="submit">Search<i className="fas fa-plus"></i></button>
        </form>

    </div>

    }
}


export default SearchBar