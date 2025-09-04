import Article from "./Article.tsx";

const ArticleList = (props) => {

  type article = {
    item_id: number,
    picture: string,
    name: string,
    state: string,
    price: number,
    city: string,
    canton_or_state: string,
    is_available: boolean
  }

  return(
    <div className="articles">
      {
        props.items?.map((item: article) => (
        <Article 
          key={item.item_id}
          id={item.item_id}
          image={item.picture} 
          title={item.name}
          city={item.city}
          canton={item.canton_or_state}
          state={item.state}
          price={item.price}
          av={item.is_available}>
          </Article>
        ))
      }
    </div>
  );
}

export default ArticleList;