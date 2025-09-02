import '../styles/Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <div className="footer">
      <div className="footercategory">
        <p>CapyBorrow</p>
        <Link to='/about'>About</Link>
        <Link to='/'>How it works</Link>
      </div>
      <div className="footercategory">
        <p>Help</p>
        <Link to='/contact'>Contact us</Link>
        <Link to='/termsandservices'>Terms and services</Link>
        <Link to='/questions'>Q&A</Link>
      </div>
    </div>
  );
};

export default Footer;