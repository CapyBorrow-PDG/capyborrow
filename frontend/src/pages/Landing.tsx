import '../styles/Landing.css';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText.tsx';

const Landing = () => {
  const navigate = useNavigate();

  return(
    <div>
      <div id="segment1">
        <img src={"../assets/images/handshake.png"} id="titleimage" alt="handshake" />
        <div className="titletext lighttext">
          <h1>Encourage sustainability</h1>
          <h3>Borrow instead of buying, lend instead of throwing away</h3>
          <button className="darkbutton" onClick={() => navigate('/shop')}>Discover</button>
        </div>
      </div>
      <div id="segment2">
        <div className="darktext">
          <h1>Save money by renting items</h1>
          <h3><b>CapyBorrow</b> is a platform that helps you borrow items from others and lend your own. Rent out items for <b>free</b> thanks to our Points system !</h3>
        </div>
        <img src={"../assets/images/exampleitem.png"} alt="example item" />
      </div>
      <div id="segment3">
        <AnimatedText image={"../assets/images/ecommerce.png"} title="Lend" desc="Add objects to your page, set their price and availability, earn points"/>
        <AnimatedText image={"../assets/images/localization.jpg"} title="Find" desc="Filter by location, type or price, bookmark in a collection for later"/>
        <AnimatedText image={"../assets/images/messagerie.jpg"} title="Borrow" desc="Contact the lender, spend points, borrow the object, give it back before the deadline"/>
      </div>
      <div id="segment4">
        <h1 className='darktext'>Try it out for free now !</h1>
        <div className='buttons'>
          <button className='lightbutton' onClick={() => alert("can't sign up yet :(")}>Sign up</button>
          <button className='darkbutton' onClick={() => navigate('/shop')}>Discover</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;