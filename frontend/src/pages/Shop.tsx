import '../styles/Shop.css'
import Select from 'react-select';
import MySlider from '../components/Slider.tsx';
import Article from '../components/Article.tsx';
import charger from '../images/chargeur.jpg';
import Dropdown from '../components/Dropdown/Dropdown.tsx';
import LocationFilter from '../components/LocationFilter.tsx';

const options = [
  {value: 'cat1', label: 'Cat1'},
  {value: 'cat2', label: 'Cat2'},
  {value: 'cat3', label: 'Cat3'}
]

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--off-white)',
    padding: '5px 10px',
    border: '2px solid var(--dark-turquoise)',
    borderRadius: '20px',
    width: '50%'
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted var(--dark-turquoise)',
    color: state.isFocused ? 'var(--off-white)' : 'var(--dark-turquoise)',
    backgroundColor: state.isFocused ? 'var(--light-turquoise)' : 'var(--off-white)'
  }),
  menu: (provided) => ({
    ...provided,
    width: '50%',
    border: '2px solid var(--dark-turquoise)'
  })
};

const Shop = () => {
  return(
    <div>
      <div className="filterslist">
        <LocationFilter />
        <div className="filterslist__buttons">
          <Dropdown buttontext="Availability" content={<p>oups</p>} />
          <Dropdown buttontext="price" content={<MySlider />} />
          <Dropdown buttontext="State" content={<p>oups</p>} />
          <Dropdown buttontext="Category" content={<p>oups</p>} />
        </div>
      </div>
    </div>
  );
};

export default Shop;

/*<Select options={options} isMulti styles={customStyles} placeholder={'Category'} />
      <Article image={charger} title="Phone charger" location="Martigny, VS" desc="Phone charger 20W USB-C" price="50" />*/