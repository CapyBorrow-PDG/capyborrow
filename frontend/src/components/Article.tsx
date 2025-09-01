import '../styles/Article.css';

const Article = (props) => {
  return(
    <div className="article">
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