import '../styles/Article.css';

const Article = (props) => {
  return(
    <div id="article">
      <img src={props.image} alt="article" />
      <h2>{props.title}</h2>
      <p><b>{props.location}</b></p>
      <p>{props.desc}</p>
      <p className="price">{props.price}p/day</p>
    </div>
  );
};

export default Article;