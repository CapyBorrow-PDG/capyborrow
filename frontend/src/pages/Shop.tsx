import '../styles/Shop.css';
import MySlider from '../components/Slider.tsx';
import Dropdown from '../components/Dropdown/Dropdown.tsx';
import LocationFilter from '../components/LocationFilter.tsx';
import Checkbox from '../components/Checkbox.tsx';
import Searchbar from '../components/Searchbar.tsx';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ArticleList from '../components/ArticleList.tsx';

const Shop = () => {

  const MIN = 0;
  const MAX = 1000;

  type locInfo = {
    radius: number,
    lat: number,
    long: number
  }

  const location = useLocation();
  const {currSearch} = location.state || {};

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(currSearch);
  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [states, setStates] = useState<string[]>([]); 
  const [categories, setCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [locationInfo, setLocationInfo] = useState<locInfo>();
  const [loading, setLoading] = useState(true);

  const statesList = ['very good', 'good', 'used'];
  const categoriesList = ['none', 'Electronics', 'Books', 'Music',
    'Cooking', 'Sport', 'Outdoor', 'Clothes', 'Travel', 'Entertainment', 'Toys', 'Tools', 'Art'];

  const toggleFilter = (list: string[], value: string, setList: (val: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const compareCoordinates = (coord1: number[], coord2: number[]) : number => {
    const earthRadius = 6371;
    let lat1 = coord1[0] * Math.PI / 180;
    let lat2 = coord2[0] * Math.PI / 180;
    let long1 = coord1[1] * Math.PI / 180;
    let long2 = coord2[1] * Math.PI / 180;
    let a = Math.sin(((lat2-lat1) ) / 2) * Math.sin(((lat2-lat1) ) / 2)
                      + Math.cos(lat1) * Math.cos(lat2)
                      * Math.sin((long2-long1) / 2) * Math.sin((long2-long1) / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (earthRadius * c);
  }

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
      .then(data => {
        if(locationInfo) data = data.filter((el) => compareCoordinates([locationInfo.lat, locationInfo.long], [el.latitude, el.longitude]) <= (locationInfo.radius / 1000));
        setItems(data);
      })
      .catch(err => console.log("Fetched items error:", err))
      .then(() => setLoading(false));
    };
    fetchItems();
  }, [currSearch, search, minPrice, maxPrice, states, categories, startDate, endDate, locationInfo]);

  return(
    <div>
      <Searchbar onChange={(e) => setSearch(e)}/>
      <div className="filterslist">
        <LocationFilter getChanges={setLocationInfo} />
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
            {
              statesList.map((el, index) => (
                <Checkbox key={index} val={el} onChange={() => toggleFilter(states, el, setStates)} checked={states.includes(el)}/>
              ))
            }
          </div>} />
          <Dropdown buttontext="Category" content={<div id="cat-list" className="checkbox-list">
            {
              categoriesList.map((el, index) => (
                <Checkbox key={index} val={el} onChange={() => toggleFilter(categories, el, setCategories)} checked={categories.includes(el)} />
              ))
            }
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
            <ArticleList items={items} />
          )}
      </div>
    </div>
  );
};

export default Shop;