import React, { Component } from "react";
import axios from "axios";
import BookCreateModal from "../modals/book-create-modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipLoader from 'react-spinners/ClipLoader';


const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

export default class MyLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      books: [],
      error: null,
      loading: true
    };
  }

  componentDidMount() {
    this.getMyBooks();
  }

  getMyBooks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://devcamp-capstone-backend-d0f2.onrender.com/books/my_books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ 
        books: response.data,
        loading: false
    });

    } catch (error) {
      console.error('Error getting my books:', error);
      this.setState({ 
        error: 'Failed to load books.',
        loading: false
    });
    }
  };

  handleBookAdded = (newBook) => {
    this.setState((prevState) => ({
      books: [...prevState.books, newBook],
      isModalOpen: false, 
    }));
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleBookClick = (bookId) => {
    // Aquí podrías redirigir a la página de detalles del libro.
    // Por ejemplo:
    // this.props.history.push(`/books/${bookId}`);
    console.log(`Book clicked: ${bookId}`);
  };

    render() {
        const { books } = this.state;

        return (
            <div className="my-library">
                <div className="header">
                    My Library
                </div>
                

                <BookCreateModal
                isOpen={this.state.isModalOpen}
                onClose={this.closeModal}
                onBookAdded={this.handleBookAdded}
                />

                {this.state.loading ? (
                    <div className="loader-container">
                        <ClipLoader loading={this.state.loading} size={250} color='#333' />
                    </div>
                ) : books.length === 0 ? ( 
                    <p>NO BOOKS FOUND</p>
                ) : ( 
                    <div className="books-wrapper">
                        {books.map((book) => (
                        <div key={book.id} className="book-item">
                            <div className="image-link-book-item">
                            <img src={book.cover_image} alt="cover-image" />
                            <Link to={`/book/${generateSlug(book.title)}`}>More info</Link>
                            </div>
                            <div className="info-book-item">
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                            <p>{book.year_published}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                
                <button className="floating-button" onClick={this.openModal}>
                    <FontAwesomeIcon icon="plus"/>
                </button>
            </div>
        );
    }
}      