import MyPopup from "./Popup.tsx";
import { useState } from "react";

const UpdateProfilePopup = (props) => {

  //temporary image to display on profile modification
  const [tempImage, setTempImage] = useState<any>();
  const [form, setForm] = useState( {
    username: "",
    fname: "",
    lname: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    //save data from form on user
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${props.user?.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    }).then(data => data.json()).catch(err => console.log(err));

    const updatedUser = res;
    props.setUser({
      ...props.user!,
      username: updatedUser.username,
      fname: updatedUser.firstname,
      lname: updatedUser.lastname
    });
    props.close();
    window.location.reload();
  }

  return(
    <div>
      <MyPopup open={props.open}>
        <form className="update-form" onSubmit={handleSubmit}>
          <img className="profile-picture" src={tempImage || props.blank} alt="profile" />
          <label htmlFor="avatar" className="lightbutton rounded upload-file">Upload image</label>
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpg" onChange={(e) => setTempImage(URL.createObjectURL(e.target.files![0]))} />
          
          <div className="form-input" >
            <label htmlFor="username">username</label><br/>
            <input type="text" id="username" name="username" value={form.username} placeholder={props.user?.username} onChange={handleChange}/>
          </div>
          <div className="form-input">
            <label htmlFor="fname">first name</label><br/>
            <input type="text" id="fname" name="fname" value={form.fname} placeholder={props.user?.fname} onChange={handleChange}/>
          </div>
          <div className="form-input">
            <label htmlFor="lname">last name</label><br/>
            <input type="text" id="lname" name="lname" value={form.lname} placeholder={props.user?.lname} onChange={handleChange} />
          </div>
          <div className="update-form-buttons">
            <input className="darkbutton rounded" type="submit" value="Submit" />
            <button className="lightbutton" onClick={() => {setTempImage(props.user?.image); props.close();}}>cancel</button>
          </div>
        </form>
      </MyPopup>
    </div>
  );
};

export default UpdateProfilePopup;