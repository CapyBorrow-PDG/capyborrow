import '../styles/Shop.css';
import MySlider from '../components/Slider.tsx';
import Article from '../components/Article.tsx';
import charger from '../images/chargeur.jpg';
import Dropdown from '../components/Dropdown/Dropdown.tsx';
import LocationFilter from '../components/LocationFilter.tsx';
import Checkbox from '../components/Checkbox.tsx';
import Searchbar from '../components/Searchbar.tsx';

/*
 * Checkbox and Article elements are hard coded for now,
 * replace with javascript code when linked to db
 * for example:
 */

/* const addToList = () => {
  const data = "";//get list of states here
  for(const res of data) {
    const sp = document.createElement("span");
    sp.innerHTML = `<CheckBox id=${theId} val=${theStateName} />`;
    document.getElementById("state-list")?.appendChild(sp);
  }
} */

/*
 * Checking a checkbox event does nothing for now, add when connected to db for filter
 * -> add every checked element to a list, use for sql command
 */

const Shop = () => {
  return(
    <div>
      <Searchbar />
      <div className="filterslist">
        <LocationFilter />
        <div className="filterslist__buttons">
          <Dropdown buttontext="Availability" content={<p>oups</p>} />
          <Dropdown buttontext="price" content={<MySlider />} />
          <Dropdown buttontext="State" content={<div id="state-list" className="checkbox-list">
            <Checkbox id="very-good" val="very good" />
            <Checkbox id="good" val="good" />
            <Checkbox id="used" val="used" />
          </div>} />
          <Dropdown buttontext="Category" content={<div id="cat-list" className="checkbox-list">
            <Checkbox id="electronics" val="Electronics" />
            <Checkbox id="books" val="Books" />
            <Checkbox id="music" val="Music" />
          </div>} />
        </div>
      </div>
      <div className="info-text darktext">
        <h3>"Search Result here"</h3>
        <p>x results</p>
      </div>
      <div className="articles">
        <Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={false} />
        <Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={false} />
        <Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={false} />
        <Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={true} />
        <Article image={charger} title="Phone charger" location="Martigny, VS" state="very good" price="50" unav={false} />
      </div>
    </div>
  );
};

export default Shop;