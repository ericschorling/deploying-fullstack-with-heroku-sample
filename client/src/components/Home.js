import React from 'react';
import {Link} from 'react-router-dom'

const Home = () =>{
    return (
        <div className="Home">
            <h1>Welcome to Pictionary with Friends</h1>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/pictionary">Pictionary</Link>
            </nav>
        </div>
    );
}

export default Home;