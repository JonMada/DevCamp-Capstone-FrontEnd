import React, {Component} from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/pages/home';
import Books from './components/pages/books';
import NavBar from "./components/navigation/nav-bar";


 export default class App extends Component {
  constructor(props){
    super(props);

  }
  
  render(){
    return(
      <Router> 
        <div>
          <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
            </Routes>
        </div>
    </Router>
    )
  }
}

