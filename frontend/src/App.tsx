import React from 'react';
import './App.css';
import NavBar from './components/NavBar.tsx';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Questions from './pages/Questions.tsx';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;