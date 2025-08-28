import '../styles/LocationFilter.css';
import { FaMapMarkerAlt } from "react-icons/fa";
import {MapContainer, Marker, TileLayer, Circle, useMap, Popup } from 'react-leaflet';
import MyPopup from '../components/Popup.tsx';
import Dropdown from './Dropdown/Dropdown.tsx';
import { useEffect, useState } from 'react';

const LocationFilter = (props) => {
  const [open, setOpen] = useState(true); //fix display results
  const [searchListOpen, setSearchListOpen] = useState(false);
  const [city, setCity] = useState('city');
  const [canton, setCanton] = useState('state');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [radius, setRadius] = useState(10000);

  //open or close the location popup
  const toggleContent = () => {
    setOpen(!open);
  }

  //temporary function to replace with actual location
  const applyChanges = () => {
    toggleContent();
  }

  //set the radius of the circle on the map
  const changeRadius = (r: number) => {
    setRadius(r);
  }

  //recenter automatically map when location changes
  const Recenter = ({lat, long}) => {
    const map = useMap();
    map.setView([lat, long]);
    return null
  }

  //search written location
  const searchLoc = () => {
    const query = (document.getElementById("location-input") as HTMLInputElement)?.value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
    .then(res => res.json())
    .then(data => {
      (document.getElementById("resultlist") as HTMLElement).innerHTML ='';
      for(const result of data) {
        const li = document.createElement('li');
        li.className = "search-result clickable";
        li.onclick = () => {
          //turn into separate function
          setLat(result.lat);
          setLong(result.lon);
          (document.getElementById("resultlist") as HTMLElement).innerHTML ='';
          setSearchListOpen(false);
          const name = result.display_name.split(", ");
          setCity(name[0]);
          setCanton(name[1]);
        };
        li.innerHTML = JSON.stringify(result.display_name);
        document.getElementById("resultlist")?.appendChild(li);
      }
      setSearchListOpen(true);
    });
  }

  useEffect(() => {
    document.getElementById("location-input")?.addEventListener("keypress", (event) => {
      if(event.key === "Enter") {
        searchLoc();
      }
    })
  }, [])

  return(
    <div className="location-filter">
      <div className="location-filter__button" onClick={toggleContent}>
        <FaMapMarkerAlt />
        <div>{city}, {canton}</div>
      </div>
      <MyPopup open={open}>
        <div className="location-filter__content">
          <h3 className="darktext">Choose a location</h3>
          <div className="search">
            <input id="location-input" type="text"></input>
            <ul id="resultlist" className={searchListOpen ? "" : "content-closed"}></ul>
          </div>
          <Dropdown buttontext={`${radius/1000}km`} content={
            <div>
              <p className="clickable" onClick={() => changeRadius(10000)}>10km</p>
              <p className="clickable" onClick={() => changeRadius(20000)}>20km</p>
              <p className="clickable" onClick={() => changeRadius(30000)}>30km</p>
              <p className="clickable" onClick={() => changeRadius(50000)}>50km</p>
            </div>
            } />
          <MapContainer id="map-container" center={[lat, long]} zoom={9}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[lat, long]}>
                    <Popup>searched location</Popup>
                  </Marker>
                  <Circle center={[lat, long]} radius={radius} />
                  <Recenter lat={lat} long={long} />
                </MapContainer>
          <button className="darkbutton" onClick={applyChanges}>apply</button>
        </div>
      </MyPopup>
    </div>
  );
};

export default LocationFilter;