import React, {Component} from 'react';
import NavBar from '../NavBar';

class Home extends Component {
    render(){
        return (
        <div className="App">
        <NavBar/>
          <h1>Home page</h1>
        </div>
        );
    }
} 

export default Home;