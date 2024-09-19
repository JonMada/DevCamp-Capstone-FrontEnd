import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Submitting:', { username, password });
  
    axios.post(
      'https://devcamp-capstone-backend-d0f2.onrender.com/users/token',
      qs.stringify({ username, password }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      const { access_token } = response.data;
      console.log('Response:', response.data);
      localStorage.setItem('token', access_token);
      props.setAuth(true);
      navigate("/");
    })
    .catch((error) => {
      setError('Invalid username or password');
      setUsername('');
      setPassword('');
      console.error('HandleSubmit error', error.response?.data || error.message);
    });
  };

  return (
    <div className='login-container'>
      <div className='login-heading'>LOGIN</div>
      <div className='login-form'>
        <div className='left-column'>
          <FontAwesomeIcon icon="fa-gear" className='custom-spin'/>
        </div>
        <div className='right-column'>
          <form onSubmit={handleSubmit}>
            <div className='username-wrapper'>
              <label>YOUR USERNAME</label>
              <input
                type="text"
                name="username"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
};

export default Login;
