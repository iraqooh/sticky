import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Abraham from './components/Abraham';
import Owen from './components/Owen';
import Robert from './components/Robert';
import Harry from './components/Harry';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abraham" element={<Abraham />} />
          <Route path="/owen" element={<Owen />} />
          <Route path="/robert" element={<Robert />} />
          <Route path="/harry" element={<Harry />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
