import React, {Component} from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Modal from 'react-modal';

import Home from './components/pages/home';
import Books from './components/pages/books';
import Login from "./components/auth/login";
import Register from './components/auth/register';
import MyLibrary from "./components/pages/my-library";
import BookDetails from "./components/books/book-details";
import NavBar from "./components/navigation/nav-bar";
import PrivateRoute from "./components/routes/private-routes";

import Icons from '../src/helpers/icons';

Modal.setAppElement('#root');


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
              <Route path="/register" element={<Register />} />
              
              <Route
                path="/auth"
                element={
                  <Login setAuth={this.handleAuthChange} />
                }
              />

              <Route
                path="/my-library"
                element={
                  <PrivateRoute isAuthenticated={this.state.isAuthenticated}>
                    <MyLibrary />
                  </PrivateRoute>
                }
              />

              <Route
                path="/book/:slug"
                element={
                  <PrivateRoute isAuthenticated={this.state.isAuthenticated}>
                    <BookDetails />
                  </PrivateRoute>
                }
              />

          </Routes>
        </div>
    </Router>
    )
  }
}

