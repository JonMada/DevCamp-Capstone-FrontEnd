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
      loading: true,
      bookToEdit: null,
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

      console.log("Sucessfull getMyBooks");

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
    this.setState({ isModalOpen: true, bookToEdit: null });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openEditModal = (book) => {
    this.setState({ isModalOpen: true, bookToEdit: book });
  };

  handleBookUpdated = (updatedBook) => {
    this.setState((prevState) => ({
      books: prevState.books.map(book => 
        book.id === updatedBook.id ? updatedBook : book
      ),
      isModalOpen: false, 
      bookToEdit: null, 
    }));
  };

  handleDeleteBook = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://devcamp-capstone-backend-d0f2.onrender.com/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState((prevState) => ({
        books: prevState.books.filter((book) => book.id !== bookId),
      }));

      console.log(`Book with id ${bookId} deleted successfully`);

    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };



    render() {
        const { books, bookToEdit } = this.state;

        return (
            <div className="my-library">
                <div className="header">
                    My Library
                </div>
                

                <BookCreateModal
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                    onBookAdded={this.handleBookAdded}
                    bookToEdit={bookToEdit} 
                    onBookUpdated={this.handleBookUpdated} 
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
                                <Link 
                                    to={`/book/${generateSlug(book.title)}`}
                                    state={{ book: book }}
                                >
                                    More info
                                </Link>
                            </div>

                            <div className="info-book-item">
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                <p>{book.year_published}</p>

                                <div className="book-actions">
                                <button onClick={() => this.openEditModal(book)}>
                                    <FontAwesomeIcon icon="edit" />
                                </button>
                                <button onClick={() => this.handleDeleteBook(book.id)}>
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                                </div>
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