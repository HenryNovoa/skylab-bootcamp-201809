import React, { Component } from 'react'

import Post from './Post'

class Home extends Component {
    state = { gallery: []}

    // componentDidMount() {
    //     // logic.listAllPosts()
    //     //     .then(posts => { this.setState({ posts }) })
    //         // Request for images tagged xmas       
    //         axios.get('https://res.cloudinary.com/christekh/image/list/xmas.json')
    //             .then(res => {
    //                 console.log(res.data.resources);
    //                 this.setState({posts: res.data.resources});
    //             });
    //     // TODO error handling!
    // }


    render() {
        return <div className="div-home">
            <h1>Pintegram App</h1>
            <button onClick={this.props.onPost} className="upload-button">Post</button>
            <button onClick='#' className="upload-button">Profile</button>
        </div>
    }
}

export default Home
