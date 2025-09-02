import '../styles/Shop.css';
import MySlider from '../components/Slider.tsx';
import Article from '../components/Article.tsx';
import Dropdown from '../components/Dropdown/Dropdown.tsx';
import LocationFilter from '../components/LocationFilter.tsx';
import Checkbox from '../components/Checkbox.tsx';
import Searchbar from '../components/Searchbar.tsx';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const Shop = () => {

  const MIN = 0;
  const MAX = 1000;

  const location = useLocation();
  const {currSearch} = location.state || {};

  type article = {
    item_id: number,
    picture: string,
    name: string,
    state: string,
    price: number,
    is_available: boolean
  }

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(currSearch);
  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [states, setStates] = useState<string[]>([]); 
  const [categories, setCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [loading, setLoading] = useState(true);

  const toggleFilter = (list: string[], value: string, setList: (val: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  useEffect(() => {

    const fetchItems = async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (minPrice) params.append("minPrice", minPrice.toString());
      if (maxPrice) params.append("maxPrice", maxPrice.toString());
      if (states.length > 0) {
        states.forEach(s => params.append("state", s));
      }
      if (categories.length > 0) {
        categories.forEach(c => params.append("category", c));
      }
      
      if(startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      fetch(`${process.env.REACT_APP_BACKEND_URL}/item?${params.toString()}`)
      .then(res => res.json())
      .then(data => {console.log("Fetched data:", data); setItems(data);})
      .catch(err => console.log("Fetched items error:", err))
      .then(() => setLoading(false));
    };
    fetchItems();
  }, [currSearch, search, minPrice, maxPrice, states, categories, startDate, endDate]);

  return(
    <div>
      <Searchbar onChange={(e) => setSearch(e)}/>
      <div className="filterslist">
        <LocationFilter />
        <div className="filterslist__buttons">
          <Dropdown buttontext="Availability" content={
            <div className="datepicker">
              <span className="darktext">from:</span>
              <input aria-label="Date" type="date" className="darktext" value={startDate} onChange={e => {setStartDate(e.target.value)}}/>
              <span className="darktext">to:</span>
              <input aria-label="Date" type="date" className="darktext" value={endDate} onChange={e => setEndDate(e.target.value)}/>
            </div>
          } />
          <Dropdown buttontext="price" content={<MySlider MIN={MIN} MAX={MAX} startMin={minPrice} startMax={maxPrice} onChange={(val) => {setMinPrice(val[0]);setMaxPrice(val[1])}} />} />
          <Dropdown buttontext="State" content={<div id="state-list" className="checkbox-list">
            <Checkbox id="very-good" val="very good" onChange={() => toggleFilter(states, "very good", setStates)} checked={states.includes("very good")}/>
            <Checkbox id="good" val="good" onChange={() => toggleFilter(states, "good", setStates)} checked={states.includes("good")} />
            <Checkbox id="used" val="used" onChange={() => toggleFilter(states, "used", setStates)} checked={states.includes("used")} />
          </div>} />
          <Dropdown buttontext="Category" content={<div id="cat-list" className="checkbox-list">
            <Checkbox id="electronics" val="Electronics" onChange={() => toggleFilter(categories, "Electronics", setCategories)} checked={categories.includes("Electronics")} />
            <Checkbox id="books" val="Books" onChange={() => toggleFilter(categories, "Books", setCategories)} checked={categories.includes("Books")} />
            <Checkbox id="music" val="Music" onChange={() => toggleFilter(categories, "Music", setCategories)} checked={categories.includes("Music")} />
            <Checkbox id="cooking" val="Cooking" onChange={() => toggleFilter(categories, "Cooking", setCategories)} checked={categories.includes("Cooking")}/>
          </div>} />
        </div>
      </div>
      <div className="info-text darktext">
        <h3>"{search || "All items"}"</h3>
        <p>{items.length} results</p>
      </div>
      <div className="articles">
          {loading ? (
            <p>Loading...</p>
          ) : (
            items.map((item: article) => (
              <Article 
                key={item.item_id} //évite une erreur dans la console 
                image={item.picture} 
                title={item.name} 
                location={"Martigny, VS"}
                state={item.state}
                price={item.price}
                av={item.is_available}>
                </Article>
            ))
          )}
      </div>
    </div>
  );
};

export default Shop;


/*
<Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={false} />
<Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={false} />
<Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={false} />
<Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={true} />
*/