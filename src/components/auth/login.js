import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import qs from 'qs';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
    
        axios.post(
            'https://devcamp-capstone-backend-d0f2.onrender.com/users/token',
            qs.stringify({ username: email, password: password }), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((response) => {
                const { access_token } = response.data;
                localStorage.setItem('token', access_token);
                this.props.setAuth(true);
                const navigate = useNavigate();
                navigate("/");
            })
            .catch((error) => {
                this.setState({
                    error: 'Invalid email or password',
                    email: '',
                    password: ''
                });
                console.log('HandleSubmit error', error);
            });
    }

  render () {
    
    const { email, password, error } = this.state;

    return (

        <div className='login-container'>

            <div className='login-heading'>
                LOGIN
            </div>

            <div className='login-form'>

                <div className='left-column'>
                        <FontAwesomeIcon icon="fa-gear" className='custom-spin'/>
                </div>

                <div className='right-column'>

                    <form onSubmit={this.handleSubmit}>

                        <div className='email-wrapper'>
                            <label>YOUR EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                value={email}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className='password-wrapper'>
                            <label>YOUR PASSWORD</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={password}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        
                        <div className='login-error'> 
                                {error && <p>{error}</p>}
                        </div>

                        <button className='btn' type="submit">LOGIN</button>
                    </form>

                </div>
                
            </div>

        </div>
      
    );
  }
}

