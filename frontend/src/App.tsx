import React from 'react';
import './App.css';
import NavBar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Questions from './pages/Questions.tsx';
import Terms from './pages/Terms.tsx';
import Shop from './pages/Shop.tsx';
import Credit from './pages/Credit.tsx';
import Profile from './pages/Profile.tsx';
import ArticleInfo from './pages/ArticleInfo.tsx';
import { Auth0Provider } from "@auth0/auth0-react";

const App = () => {
  return (
    <div className="App">
      <Auth0Provider domain="capyborrow-test.eu.auth0.com" clientId="5nYl1ok0EU7tw60OBQalfZmHYnIYNXkb" authorizationParams={{ redirect_uri: window.location.origin }}>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/termsandservices" element={<Terms />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/articleinfo' element={<ArticleInfo />} />
          </Routes>
        </div>
        <Footer />
      </Auth0Provider>
    </div>
  );
}

export default App;