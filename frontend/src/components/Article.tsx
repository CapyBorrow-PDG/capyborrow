import '../styles/Article.css';
import { useNavigate } from 'react-router-dom';

const Article = (props) => {

  const navigate = useNavigate();

  return(
    <div className="article" onClick={() => navigate(`/item/${props.id}`)}>
      <div className="article-img">
        <p className={`unavailable-text ${props.av ? '' : 'unavailable'}`}>Unavailable</p>
        <img src={props.image} alt="article" />
      </div>
      <h2>{props.title}</h2>
      <p className="location">{props.location}</p>
      <p>{props.state} state</p>
      <p className="price">{props.price}p/day</p>
    </div>
  );
};

export default Article;