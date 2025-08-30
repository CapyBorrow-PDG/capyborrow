import '../styles/Searchbar.css'
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';

const Searchbar = (props) => {
  
  //const [query, setQuery] = useState("");

  const handleSubmit = () => {
    const input = (document.getElementById("searchbar-input") as HTMLInputElement);
    props.onChange(input.value);
  }
  
  return(
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input id="searchbar-input" type="text" placeholder="Search..." onChange={() => {handleSubmit()}}></input>
        <BiSearch className="search-icon" />
      </form>
    </div>
  );
};

export default Searchbar;