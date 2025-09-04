import Article from "./Article.tsx";

const ArticleList = (props) => {

  type article = {
    item_id: number,
    picture: string,
    name: string,
    state: string,
    price: number,
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
          location={"Martigny, VS"}
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