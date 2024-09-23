import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const BookCreateModal = ({ isOpen, onClose, onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState(''); 
  const [rating, setRating] = useState(1);
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState(null);

  const handleCreateBook = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('year_published', parseInt(year));
    formData.append('summary', summary);
    formData.append('review', review);
    formData.append('rating', parseInt(rating));
    formData.append('cover_image', coverImage);

 
    if (!title || !author || !year || !summary || !review || !coverImage) {
      setError("All fields are required.");
      return;
    }

    console.log("Book data being sent:", Object.fromEntries(formData)); 

    try {
      const response = await axios.post(
        'https://devcamp-capstone-backend-d0f2.onrender.com/books/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onBookAdded(response.data); 
      onClose(); 

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail || 'Failed to create the book. Please try again.');
      } else {
        setError('Failed to create the book. Please try again.');
      }
      console.error('Error creating book:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <h2>Add New Book</h2>
      <form onSubmit={handleCreateBook}>
        <div>
          <label>TITLE</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>AUTHOR</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>YEAR</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label>SUMMARY</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
        </div>
        <div>
          <label>REVIEW</label>
          <input type="text" value={review} onChange={(e) => setReview(e.target.value)} required />
        </div>
        <div>
          <label>RATING</label>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
          />
          <span>{rating} / 5</span> 
        </div>
        <div>
          <label>COVER IMAGE URL</label>
          <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required />
        </div>
        <div className='creating-error'>
          {error && <p>{error}</p>}
        </div>
        <button type="submit">ADD BOOK</button>
      </form>
    </Modal>
  );
};

export default BookCreateModal;
