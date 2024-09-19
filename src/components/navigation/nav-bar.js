import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../../static/assets/logo/logo.png';


export default class NavBar extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
      };
    }
    
    render() {
      const { isAuthenticated, handleSignOut } = this.props
      return (
        <div className="navbar-wrapper">
            <div className="logo-wrapper">
                <Link to='/'>
                    <img alt="logo" src={Logo}/>
                </Link>
                
            </div>
            <div className="links-wrapper">
              {isAuthenticated ? (
              <>
                <Link to="/books">BOOKS</Link>
                <Link to="/my-library">MY LIBRARY</Link>
                <button onClick={handleSignOut} className="sign-out-button">
                  <FontAwesomeIcon icon='xmark'/>
                </button>
              </>
            ) : (
              <>
                <Link to="/books">BOOKS</Link>
                <Link to="/register">REGISTER</Link>
                <Link to="/auth">LOGIN</Link>
              </>
            )}
            </div>
        </div>
      )
    }
}