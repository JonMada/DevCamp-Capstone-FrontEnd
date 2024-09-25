import React, { Component } from "react";
import axios from "axios";
import ClipLoader from 'react-spinners/ClipLoader';

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            filteredBooks: [],
            error: null,
            loading: true,
            selectedCentury: 'All', 
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
                filteredBooks: response.data,  
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

  
    filterByCentury = (century) => {
        const { books } = this.state;

        if (century === 'All') {
            this.setState({ filteredBooks: books });
        } else {
            const centuryNumber = parseInt(century);
            const filteredBooks = books.filter(book => {
                const year = parseInt(book.year_published);
                const bookCentury = Math.ceil(year / 100);
                return bookCentury === centuryNumber;
            });

            this.setState({ filteredBooks });
        }
    };

    handleCenturyClick = (century) => {
        this.setState({ selectedCentury: century });
        this.filterByCentury(century);
    };

    render() {
        const { filteredBooks, loading, selectedCentury } = this.state;

        return (
            <div className="books">
                <span className="books-header">Books</span>

              
                <div className="century-filter">
                    <button
                        className={`century-button ${selectedCentury === 'All' ? 'active' : ''}`}
                        onClick={() => this.handleCenturyClick('All')}
                    >
                        All Centuries
                    </button>
                    <button
                        className={`century-button ${selectedCentury === '19' ? 'active' : ''}`}
                        onClick={() => this.handleCenturyClick('19')}
                    >
                        19th Century
                    </button>
                    <button
                        className={`century-button ${selectedCentury === '20' ? 'active' : ''}`}
                        onClick={() => this.handleCenturyClick('20')}
                    >
                        20th Century
                    </button>
                    <button
                        className={`century-button ${selectedCentury === '21' ? 'active' : ''}`}
                        onClick={() => this.handleCenturyClick('21')}
                    >
                        21st Century
                    </button>
                </div>

                
                {loading ? (
                    <div className="loader-container">
                        <ClipLoader loading={loading} size={250} color='#333' />
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <span className="books-no-found">NO BOOKS FOUND</span>
                ) : (
                    <div className="books-wrapper">
                        {filteredBooks.map((book) => (
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
