import React, { Component } from 'react'

class SearchBar extends Component {

    state = { city: '' }


    handleCityChange = event => {
        const city = event.target.value

        this.setState({ city })
    }

    handleSubmit = () => {

        this.props.onCitySearch(this.state.city)

    }

    render() {

        return <div className='searchbar'>
            <h3>Search for jobs</h3>
            <select className='searchbar__select' onChange={this.handleCityChange} defaultValue="none">
                <option disabled={true} value="none">Choose a city</option>
                <option value='all'>All</option>
                <option value='barcelona'>Barcelona</option>
                <option value='madrid'>Madrid</option>
                <option value='sevilla'>Sevilla</option>
                <option value='valencia'>Valencia</option>
                <option value='bilbao'>Bilbao</option>
            </select>
            <button onClick={this.handleSubmit}>Search</button>


        </div>

    }
}


export default SearchBar