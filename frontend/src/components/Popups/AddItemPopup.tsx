import '../../styles/AddItemPopup.css';
import MyPopup from "./Popup.tsx";
import Dropdown from "../Dropdown/Dropdown.tsx";
import { useState, useEffect } from "react";

const AddItemPopup = (props) => {

  const [searchListOpen, setSearchListOpen] = useState(false);
  const [city, setCity] = useState('city');
  const [canton, setCanton] = useState('state');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const [currState, setCurrState] = useState<string>("state");
  const [tempImage, setTempImage] = useState<any>();
  const [cat1, setCat1] = useState<string>("category");
  const [cat2, setCat2] = useState<string>("category");
  const [form, setForm] = useState({
      name: "",
      description: "",
      price: 0,
      state: "",
      ownerId: props.userId,
      category1: "",
      category2: "",
      picture: "",
      city: "",
      canton_or_state: "",
      latitude: 0,
      longitude: 0
    });

  const states = ['very good', 'good', 'used'];
  const categories = ['none', 'Electronics', 'Books', 'Music', 'Cooking', 'Sports', 'Outdoor',
                      'Clothes', 'Travel', 'Entertainment', 'Toys', 'Tools', 'Art'];

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    if(!form.name || !form.price || !currState || !cat1 || !cat2 || !tempImage) {
      console.log(form.name + " " + form.price + " " + currState);
      alert("Please fill every mandatory field");
    } else {
      e.preventDefault();

      form.state = currState;
      form.ownerId = props.userId;
      if(cat1 !== "none") form.category1 = cat1;
      if(cat2 !== "none") form.category2 = cat2;
      form.picture = tempImage;

      form.city = city;
      form.canton_or_state = canton;
      form.latitude = lat;
      form.longitude = long;

      console.log("form: ", form);
      
      fetch(`${process.env.REACT_APP_BACKEND_URL}/item`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(form)
      }).then(data => data.json()).then(res => console.log(res)).catch(err => console.log(err));

      props.close();
      window.location.reload();
    }
  }

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
            setLat(result.lat);
            setLong(result.lon);
            (document.getElementById("resultlist") as HTMLElement).innerHTML ='';
            setSearchListOpen(false);
            console.log(result.address);
            setCity(result.address.town || result.address.state);
            setCanton(result.address.state);
          };
          li.innerHTML = JSON.stringify(result.display_name);
          document.getElementById("resultlist")?.appendChild(li);
        }
        setSearchListOpen(true);
      });
    }

  return(
    <div>
      <MyPopup open={props.open}>
        <form className="post-form" onSubmit={handleSubmit}>
          <img className={`item-picture ${tempImage ? '': 'no-image'}`} src={tempImage} alt="item" />
          <label htmlFor="item-picture" className="lightbutton rounded upload-file clickable">Upload image</label>
          <input type="file" id="item-picture" name="item-picture" accept="image/png, image/jpg" onChange={(e) => {if(e.target.files) setTempImage(URL.createObjectURL(e.target.files![0]))}} />
          
          <div className="search">
            <label htmlFor="location-input">location</label>
            <input id="location-input" type="text" onChange={searchLoc}></input>
            <ul id="resultlist" className={searchListOpen ? "" : "content-closed"}></ul>
          </div>

          <div className="post-category">
            <label htmlFor="name">name</label>
            <input id="name" name="name" type="text" onChange={handleChange}></input>
          </div>
          <div className="post-category">
            <label htmlFor="description">description</label>
            <input id="description" name="description" type="text" onChange={handleChange}></input>
          </div>
          <div className="post-category">
            <label htmlFor="price">price</label>
            <input id="price" name="price" type="number" onChange={handleChange}></input>
          </div>

          <label htmlFor="category-buttons"> categories</label>
          <div id="category-buttons" className="category-buttons">
            <Dropdown 
              buttontext={cat1}
              content={
                <div>
                  {
                  categories.map((entry: string, index) => (
                    <p key={index} className="clickable" onClick={() => {setCat1(entry.toString())}} >{entry}</p>
                  ))
                  }
                </div>
                }
            />

            <Dropdown 
              buttontext={cat2}
              content={
                <div>
                  {
                  categories.map((entry: string, index) => (
                    <p key={index} className="clickable" onClick={() => {setCat2(entry.toString())}} >{entry}</p>
                  ))
                  }
                </div>
                }
            />
          </div>
          <label htmlFor="state-button">state</label>
          <div id="state-button">
            <Dropdown 
            buttontext={currState}
            content={
              <div>
                {
                states.map((entry: string, index) => (
                  <p key={index} className="clickable" onClick={() => {setCurrState(entry.toString())}} >{entry}</p>
                ))
                }
              </div>
              }
          />
          </div>
          <br/>
          <div className="post-form-buttons">
            <input className="darkbutton rounded clickable" type="submit" value="Submit" />
            <button className="lightbutton clickable" onClick={props.close}>cancel</button>
          </div>
        </form>
      </MyPopup>
    </div>
  );
};

export default AddItemPopup;