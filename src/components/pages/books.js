import React, { Component } from "react";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader';

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            error: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = async () => {
        try {
            const response = await axios.get('https://devcamp-capstone-backend-d0f2.onrender.com/books/');
            console.log("Successfully fetched books");

            this.setState({ 
                books: response.data,
                loading: false
            });

        } catch (error) {
            console.error('Error getting books:', error);
            this.setState({ 
                error: 'Failed to load books.',
                loading: false
            });
        }
    };

    render() {
        const { books, loading } = this.state;

        return (
            <div className="books">
                <span className="books-header">Books</span>

                {loading ? (
                    <div className="loader-container">
                        <ClipLoader loading={loading} size={250} color='#333' />
                    </div>
                ) : books.length === 0 ? (
                    <p>No books found</p>
                ) : (
                    <div className="books-wrapper">
                        {books.map((book) => (
                            <div key={book.id} className="books-item">
                                <div className="image-book-item">
                                    <img src={book.cover_image} alt={`Cover-image of ${book.title}`} />
                                </div>
                                <div className="info-book-item">
                                    <h3>{book.title}</h3>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Published:</strong> {book.year_published}</p>
                                    <p><strong>Rating:</strong> {book.rating}/5</p>
                                    <p><strong>Summary:</strong> {book.summary}</p>
                                    <p><strong>Review:</strong> {book.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
