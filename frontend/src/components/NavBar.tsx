import React from "react";
import capylogo from '../images/logoCapyBorrow.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return(
    <div className="header">
        <div id="logoandmenu">
          <div className="nav">
            <ul>
              <li>
                <Link to="/"><img src={capylogo} className="logo" alt="logo" /></Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <a href="/questions">Q&A</a>
              </li>
            </ul>
          </div>
        </div>
        <div id="buttons">
          <button className="headerbutton" id="loginButton"> 
            Log in
          </button>
          <button className="headerbutton" id="signupButton"> 
            Sign up
          </button>
        </div>
      </div>
  );
};

export default NavBar;