import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home'

function App() {
  const articles = {
    "article1.md": "Article 1",
    "article2.md": "Article 2",
    "article3.md": "Article 3",
    "article4.md": "Article 4",
    "article5.md": "Article 5"
  }
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p className="font-bold text-red-600">
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Home articles={articles}></Home>
  );
}

export default App;
