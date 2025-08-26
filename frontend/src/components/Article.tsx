import '../styles/Article.css';

const Article = (props) => {
  return(
    <div id="article">
      <img src={props.image} alt="article" />
    </div>
  );
};

export default Article;