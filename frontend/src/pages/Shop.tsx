import Article from '../components/Article.tsx';
import charger from '../images/chargeur.jpg';

const Shop = () => {
  return(
    <div style={{margin:"300px"}}>
      <h1>Shop</h1>
      <h3>work in progress</h3>
      <Article image={charger} />
    </div>
  );
};

export default Shop;