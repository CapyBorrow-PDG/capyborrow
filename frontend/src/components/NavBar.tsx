import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import Login from './Login.tsx';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';

const NavBar = () => {

  const [open, setOpen] = useState(false);

  return(
    <div className="header">
        <div id="logoandmenu">
          <div className="nav">
            <Link to="/"><img src={"../assets/images/logoCapyBorrow.png"} className="logo" alt="logo" /></Link>
            <FiMenu className="menu-icon clickable" onClick={() => setOpen(!open)} />
            <div className={`menu-links ${open ? 'open' : ''}`} >
              <Link to="/about">About</Link>
              <Link to="/contact">Contact us</Link>
              <Link to="/questions">Q&A</Link>
            </div>
          </div>
        </div>
        <Login />
      </div>
  );
};

export default NavBar;