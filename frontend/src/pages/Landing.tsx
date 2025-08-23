import handshake from '../images/handshake.png';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return(
    <div id="title">
      <img src={handshake} id="titleimage" alt="handshake" />
      <div className="titletext">
        <h1>Encourage sustainability</h1>
        <h3>Borrow instead of buying, lend instead of throwing away</h3>
        <button className="darkbutton" onClick={() => navigate('/shop')}>Discover</button>
      </div>
    </div>
  );
};

export default Landing;