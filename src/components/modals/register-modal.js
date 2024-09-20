import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const RegisterModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // 

  const handleRedirectToLogin = () => {
    onClose(); 
    navigate("/auth"); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Registration Successful"
      className="modal"
      overlayClassName="overlay"
    >
        <div className='content-wrapper'>
            <p className='heading'>Success!</p>
            <p>You have been registered successfully. Please log in to continue.</p>

        <div className='btn-wrapper'>
            <button className="btn" onClick={handleRedirectToLogin}>Go to Login</button>
            <button className="btn" onClick={onClose}>Close</button>
        </div>
        </div>
     
      
     
    </Modal>
  );
};

export default RegisterModal;
