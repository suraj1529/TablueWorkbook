import React from 'react';
import './App.css';
import Header from './Js/Header';
// import DropdownButtons from './Js/DropdownButtons';
// import Footer from './Js/Footer';
import Connection from './Js/Connection';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* <DropdownButtons /> */}
        <Connection />
      </main>
            {/* <Footer /> */}
          </div>
  );
}

export default App;
