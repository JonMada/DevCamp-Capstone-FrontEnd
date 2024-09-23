import React, { useState } from 'react';
import axios from 'axios';
import RegisterModal from '../modals/register-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://devcamp-capstone-backend-d0f2.onrender.com/users', {
        username,
        email,
        password,
      });
      setIsModalOpen(true);
    } catch (error) {
      setEmail('');
      setUsername('');
      setPassword('');
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="register-container">
       <div className='register-heading'>REGISTER</div>
      <form className="register-form" onSubmit={handleRegister}>
        <div className='left-column'>
            <FontAwesomeIcon icon="camera-retro"/>
        </div>
        <div className="right-column">
          <div className="username-wrapper">
            <label> YOUR USERNAME</label>
            <input
              type="text"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="email-wrapper">
            <label> YOUR EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div className="password-wrapper">
            <label>YOUR PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <div className='register-error'>
            {error && <p>{error}</p>}
          </div>
          <button type="submit" className="btn">REGISTER</button>
         
        </div>
      </form>
      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Register;
