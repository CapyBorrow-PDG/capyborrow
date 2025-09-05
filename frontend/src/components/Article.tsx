import { useEffect, useState } from 'react';
import '../styles/Article.css';
import { useNavigate } from 'react-router-dom';

const Article = (props) => {

  const navigate = useNavigate();

  const [srcImg, setSrcImg] = useState<string>('../assets/images/noimage.png');

  useEffect(() => {
    if(!props.image.includes('blob')) {
      setSrcImg(props.image);
    } else {
      setSrcImg('../assets/images/noimage.png');
    }
  }, [props.image]);

  return(
    <div className="article" onClick={() => navigate(`/item/${props.id}`)}>
      <div className="article-img">
        <p className={`unavailable-text ${props.av ? '' : 'unavailable'}`}>Unavailable</p>
        <img src={srcImg} alt="article" />
      </div>
      <h2>{props.title}</h2>
      <p className="location">{props.city}, {props.canton}</p>
      <p>{props.state} state</p>
      <p className="price">{props.price}p/day</p>
    </div>
  );
};

export default Article;