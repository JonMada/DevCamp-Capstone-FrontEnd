import React, {Component} from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/pages/home';
import Books from './components/pages/books';
import Login from "./components/auth/login";
import Register from './components/auth/register';
import NavBar from "./components/navigation/nav-bar";

import Icons from '../src/helpers/icons';


 export default class App extends Component {
  constructor(props){
    super(props);

    this.handleAuthChange = this.handleAuthChange.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    
    this.state = {
      isAuthenticated: !!localStorage.getItem('token'),
    };

    Icons();

  }

  handleAuthChange = (status) => {
    this.setState({ isAuthenticated: status });
  };

  handleSignOut = () => {
    localStorage.removeItem('token');
    this.setState({ isAuthenticated: false });
  };


  
  render(){
    return(
      <Router> 
        <div>
          <NavBar 
            isAuthenticated={this.state.isAuthenticated}
            handleSignOut={this.handleSignOut}
          />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route
                path="/auth"
                element={
                  <Login setAuth={this.handleAuthChange} />
                }
              />
            </Routes>
        </div>
    </Router>
    )
  }
}

