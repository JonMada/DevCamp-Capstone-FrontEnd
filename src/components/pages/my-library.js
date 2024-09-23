import React, { Component } from "react";
import axios from "axios";
import BookCreateModal from "../modals/book-create-modal";

export default class MyLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      books: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://devcamp-capstone-backend-d0f2.onrender.com/books/my_books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ books: response.data });
    } catch (error) {
      console.error('Error fetching books:', error);
      this.setState({ error: 'Failed to load books.' });
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
      <div>
        <h1>My Library</h1>
        <button className="floating-button" onClick={this.openModal}>
          Add Book
        </button>

        <BookCreateModal
          isOpen={this.state.isModalOpen}
          onClose={this.closeModal}
          onBookAdded={this.handleBookAdded}
        />

        {books.length === 0 ? (
          <p>NO BOOKS FOUND</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.id} onClick={() => this.handleBookClick(book.id)}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.year_published}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
