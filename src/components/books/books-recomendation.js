import React, {Component} from 'react';

export default class  BooksRecomendation extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="books-recommendation">
                <h1>Recommended Books</h1>
                <div className="books-list-wrapper">
                    {this.props.books.length > 0 ? 
                        this.props.books
                            .filter(book => 
                                book.volumeInfo.imageLinks?.thumbnail && 
                                book.volumeInfo.title && 
                                book.volumeInfo.authors && 
                                book.volumeInfo.description &&
                                book.volumeInfo.infoLink &&
                                book.volumeInfo.publishedDate
                            )
                            .map((book, index) => (
                                <div key={index} className="book-item">
                                    <div className='image-link-book-item'>
                                        <img
                                            src={book.volumeInfo.imageLinks.thumbnail}
                                            alt={book.volumeInfo.title}
                                        />
                                        <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">More Info</a>
                                    </div>
    
                                    <div className='info-book-item'>
                                        <h3>{book.volumeInfo.title}</h3>
                                        <p><strong>Author:</strong> {book.volumeInfo.authors.join(', ')}</p>
                                        <p><strong>Description:</strong> {`${book.volumeInfo.description.substring(0, 500)}...`}</p>
                                        <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
                                    </div>
                                </div>
                            ))
                     : (
                        <p>No books available.</p>
                    )}
                </div>
            </div>
        );
    }
}
    


