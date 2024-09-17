import React, { Component } from "react";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';


import HeroSection from "../sections/hero-section";
import BooksRecommendation from "../books/books-recomendation";

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
      'romance',  
      'biography',
      'terror',
      'cinema',
      'sport biographies',
      'tattoos',
      'philosofy',
      'web development',
      'music',
      'folklore',
      'politics',
      'social media',
      'travelling book',
      'photografy'
    ];

    const randomIndex = Math.floor(Math.random() * queries.length);
    return queries[randomIndex];
    };

    componentDidMount() {
      this.getBooks();
    }
  
    getBooks = async () => {
      const query = this.getRandomQuery();
      const maxResults = 10;
      const language = "en";
  
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&orderBy=relevance&langRestrict=${language}&key=AIzaSyDJS-tJrHMTU6AmdwZde8tSa5KKSd1JC-k`;
  
      try {
        const response = await axios.get(url);
        console.log(response.data);
        this.setState({
          books: response.data.items,
          loading: false
        })
      } catch (error) {
        console.error('Error getting recomendations:', error);
      }
    };
  
    render() {
      return (
        <div>
          <HeroSection />
          {this.state.loading ? (
            <div className="loader-container">
              <ClipLoader loading={this.state.loading} size={250} color='#fffc33'/>
            </div>
          ) : (
          <BooksRecommendation books={this.state.books} />
        )}
        </div>
      );
    }
}



  

