import '../styles/LocationFilter.css';
import { FaMapMarkerAlt } from "react-icons/fa";
import Popup from '../components/Popup.tsx';
import Dropdown from './Dropdown/Dropdown.tsx';
import { useState } from 'react';

const LocationFilter = (props) => {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('Location');

  const toggleContent = () => {
    setOpen(!open);
  }

  //temporary function to replace with actual location
  const applyChanges = () => {
    const title = (document.getElementById("location-input") as HTMLInputElement).value;
    setLocation(title ? title : 'Location');
    toggleContent();
  }

  return(
    <div className="location-filter">
      <div className="location-filter__button" onClick={toggleContent}>
        <FaMapMarkerAlt />
        <div>{location}</div>
      </div>
      <Popup open={open}>
        <div className="location-filter__content">
          <p>Choose a location</p>
          <input id="location-input"></input>
          <Dropdown buttontext="radius" content={
            <p>radius choices will go here</p>
            } />
          <div>map will go here</div>
          <button onClick={applyChanges}>apply</button>
        </div>
      </Popup>
    </div>
  );
};

export default LocationFilter;