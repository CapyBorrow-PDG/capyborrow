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
        <div className="buttons">
          <button className="headerbutton darkbutton" onClick={() => alert("can't log in yet :(")}> 
            Log in
          </button>
          <button className="headerbutton lightbutton" onClick={() => alert("can't sign up yet :(")}> 
            Sign up
          </button>
        </div>
      </div>
  );
};

export default NavBar;