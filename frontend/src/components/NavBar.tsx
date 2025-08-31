import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import Login from './Login.tsx';

const NavBar = () => {

  return(
    <div className="header">
        <div id="logoandmenu">
          <div className="nav">
            <ul>
              <li>
                <Link to="/"><img src={"../assets/images/logoCapyBorrow.png"} className="logo" alt="logo" /></Link>
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
          <Login/>
        </div>
      </div>
  );
};

export default NavBar;