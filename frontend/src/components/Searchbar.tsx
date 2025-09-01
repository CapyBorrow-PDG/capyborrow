import '../styles/Searchbar.css'
import { BiSearch } from 'react-icons/bi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    const input = document.getElementById("searchbar-input") as HTMLInputElement;
    input.addEventListener("keypress", (event) => {
      if(event.key === "Enter") {
        setPage(input.value);
      }
    })

    const setPage = (search) => {
      navigate("/shop", { state: { currSearch: search }});
    }
  }, [navigate]);
  
  return(
    <div className="searchbar">
      <input id="searchbar-input" type="text" placeholder="Search..." onChange={(e) => {props.onChange(e.target.value)}}></input>
      <BiSearch className="search-icon" />
    </div>
  );
};

export default Searchbar;