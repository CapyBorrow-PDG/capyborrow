import { useEffect, useState } from 'react';
import {MapContainer, Marker, TileLayer, Circle, useMap, Popup } from 'react-leaflet';

/*ideas for geolocation on the website*/
//when create object:
// set location of object as current location of user ?
// or let person set location themselves
//to filter by location:
// search location in search bar
// choose and click on location of choice
// set radius
// -> get lat and long of chosen location
// -> results will be filtered by comparing chosen location w/ object location
// -> keep only when difference is smaller than radius

const TestGeo = () => {
  const [city, setCity] = useState('city');
  const [canton, setCanton] = useState('canton');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [radius, setRadius] = useState(10000);

  //recenter automatically map when location changes
  const Recenter = ({lat, long}) => {
    const map = useMap();
    map.setView([lat, long]);
    return null
  }
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const {latitude, longitude} = pos.coords;
      setLat(latitude);
      setLong(longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url).then(res => res.json()).then(data => {
        setCity(data.address.town);
        setCanton(data.address.state);
      });
    },
    (err) => {console.log(err)},
    {timeout: 15000, enableHighAccuracy: false, maximumAge:10000})
  }, []);

  const searchLoc = () => {
    const query = (document.getElementById("search") as HTMLInputElement).value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
    .then(res => res.json())
    .then(data => {
      (document.getElementById("resultlist") as HTMLElement).innerHTML ='';
      for(const result of data) {
        console.log(result.lat, result.lon);
        const li = document.createElement('li');
        li.style = "cursor: pointer; list-style-type: none; border: 2px solid var(--dark-turquoise)";
        li.onclick = () => {setLat(result.lat); setLong(result.lon)};
        li.innerHTML = JSON.stringify(result.display_name);
        document.getElementById("resultlist")?.appendChild(li);
      }
    });
  }

  function changeRadius(r: number) {
    setRadius(r);
  }

  return(
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <div style={{display:"flex", justifyContent:"center"}}>
          <p><b>your current location: </b></p>
          <p>{city}, {canton}</p>
        </div>
        <div style={{display:"flex"}}>
          <button onClick={() => changeRadius(10000)}>10km</button>
          <button onClick={() => changeRadius(20000)}>20km</button>
          <button onClick={() => changeRadius(30000)}>30km</button>
          <button onClick={() => changeRadius(50000)}>50km</button>
        </div>
        <div style={{display:"flex"}}>
          <input id="search" type="text"/>
          <button type="button" onClick={searchLoc}>search</button>
        </div>
        <ul id="resultlist"></ul>
      </div>
      <MapContainer style={{height:"400px", width:"400px"}} id="map-container" center={[lat, long]} zoom={9}>
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
    </div>
  );
};

export default TestGeo;