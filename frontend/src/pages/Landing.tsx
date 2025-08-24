import handshake from '../images/handshake.png';
import example from '../images/exampleitem.png';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return(
    <div>
      <div id="segment1">
        <img src={handshake} id="titleimage" alt="handshake" />
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
        <img src={example} alt="example item" />
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