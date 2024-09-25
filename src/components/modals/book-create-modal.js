import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookCreateModal = ({ isOpen, onClose, onBookAdded, bookToEdit, onBookUpdated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState(''); 
  const [rating, setRating] = useState(1);
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (bookToEdit) {
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
        setYear(bookToEdit.year_published);
        setSummary(bookToEdit.summary);
        setReview(bookToEdit.review);
        setRating(bookToEdit.rating);
        setCoverImage(bookToEdit.cover_image);
      } else {
        resetForm();
      }
    } else {
      resetForm(); 
    }
  }, [isOpen, bookToEdit]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setYear('');
    setSummary('');
    setReview('');
    setRating(1);
    setCoverImage('');
    setError(null);
  };

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

    console.log("Book data being sent:", {
      title,
      author,
      year_published: parseInt(year),
      summary,
      review,
      rating: parseInt(rating),
      cover_image: coverImage,
    });

    try {
      if (bookToEdit) {
        const response = await axios.put(
          `https://devcamp-capstone-backend-d0f2.onrender.com/books/${bookToEdit.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

       
        );
        onBookUpdated(response.data);
      } else {
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
      }
      onClose(); 
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.data) {
      setError(error.response.data.detail || 'Failed to create or update the book. Please try again.');
    } else {
      setError('Failed to create or update the book. Please try again.');
    }
    console.error('Error:', error);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-book-creator" overlayClassName="overlay">
      <div className='book-create-wrapper'>
        <div className='header-wrapper'>
          <h2>{bookToEdit ? 'EDIT BOOK' : 'ADD NEW BOOK'}</h2>
          <button onClick={onClose} className="close-button">
            <FontAwesomeIcon icon='xmark'/>
          </button>
        </div>

        <div className='form-wrapper'>
          <form onSubmit={handleCreateBook}>
            <div className="row-1">
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
            </div>

            <div className="row-2">
              <div>
                <label>SUMMARY</label>
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
              </div>
              <div>
                <label>REVIEW</label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} required />
              </div>
            </div>

            <div className='creating-error'>
              {error && <p>{error}</p>}
            </div>
          
            <div className="row-3">
              <div className="cover-url">
                <label>COVER IMAGE URL</label>
                <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required />
              </div>

              <div className="rating">
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

              <button type="submit" className="submit-button">{bookToEdit ? "EDIT BOOK" : "ADD BOOK"}</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BookCreateModal;
