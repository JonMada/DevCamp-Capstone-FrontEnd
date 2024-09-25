import React from 'react';
import { useLocation } from 'react-router-dom';


const BookDetails = () => {
  const location = useLocation();
  const { book } = location.state || {}; 

  return (
    <div className="book-details-container">
      {book ? (
        <div className="book-details-content">
          <div className="book-image">
            <img src={book.cover_image} alt={`Cover-image of ${book.title}`} />
          </div>
          <div className="book-info">
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published:</strong> {book.year_published}</p>
            <p><strong>Rating:</strong> {book.rating}/5</p>
            <p><strong>Summary:</strong> {book.summary}</p>
            <p><strong>Review:</strong> {book.review}</p>
          </div>
        </div>
      ) : (
        <p>BOOK DETAILS NOT AVAILABLE</p>
      )}
    </div>
  );
};

export default BookDetails;
