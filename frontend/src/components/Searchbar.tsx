import '../styles/Searchbar.css'
import { BiSearch } from 'react-icons/bi';

const Searchbar = (props) => {

  const handleSubmit = () => {
    const input = (document.getElementById("searchbar-input") as HTMLInputElement);
    //handle search here
  }

  return(
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input id="searchbar-input" type="text" placeholder="Search..."></input>
        <BiSearch className="search-icon" />
      </form>
    </div>
  );
};

export default Searchbar;