import React, { Component } from "react";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';


import HeroSection from "../sections/hero-section";
import BooksRecommendation from "../books/books-recomendation";
import Footer from "../sections/footer";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loading: true
    };
  }

  getRandomQuery () {
    const queries = [
      'fiction', 
      'science', 
      'technology', 
      'history', 
      'fantasy',  
      'mystery', 
      'terror',
      'cinema',
      'sport biographies',
      'tattoos',
      'philosofy',
      'music',
      'folklore',
      'politics',
      'social media',
      'photografy'
    ];

    const randomIndex = Math.floor(Math.random() * queries.length);
    return queries[randomIndex];
    };

    componentDidMount() {
      this.getBooks();
    }
    
  
    getBooks() {
      const query = this.getRandomQuery();
      const maxResults = 30;
      const language = "en";
  
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&orderBy=relevance&langRestrict=${language}&key=AIzaSyDJS-tJrHMTU6AmdwZde8tSa5KKSd1JC-k`;
  
      axios.get(url)
        .then(response => {
          console.log("Successful getBooks", response.data);
          this.setState({
            books: response.data.items,
            loading: false
          });
        })
        .catch(error => {
          console.error('Error getting recommendations:', error);
        });
    }


    render() {
      return (
        <div>
            <HeroSection />
            
            {this.state.loading ? (
              <div className="loader-container">
                <ClipLoader loading={this.state.loading} size={250} color='#333'/>
              </div>
            ) : (
            <BooksRecommendation books={this.state.books} />
            )}

            <Footer/>
        </div>
      );
    }
}



  

