import React from 'react';
import Modal from 'react-modal';


const DeleteModal = ({ isOpen, onClose, onConfirm, bookTitle }) => {
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
        <div className="content-wrapper">
          <h2 className="heading">Confirm Deletion</h2>
          <p>Are you sure you want to delete <span className='book-title'>"{bookTitle}"</span>?</p>
          <div className="btn-wrapper">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn confirm-button" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </Modal>
    );
  };

export default DeleteModal;
