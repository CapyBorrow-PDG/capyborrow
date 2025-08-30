import { useEffect, useState } from 'react';
import '../styles/Profile.css';
import MyPopup from '../components/Popup.tsx';
import userFile from '../tempUserFile.json'; //temporary local json file for tests

const Profile = () => {

  type User = {
    image: string,
    username: string,
    fname: string,
    lname: string,
    points: string
  }


  //set default as current stored user info
  const [user, setUser] = useState<User>();
  //temporary image to display on profile modification
  const [tempImage, setTempImage] = useState<any>();

  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    //save data from form on user
  }

  useEffect(() => {
    setUser(userFile);
    setTempImage(user?.image);
  }, [user])

  return(
    <div className="profile">
      <img id="pr" className="profile-picture" src={user?.image} alt="profile" />
      <p className="username">{user?.username}</p>
      <p>{user?.fname} {user?.lname}</p>
      <p>{user?.points} points</p>
      
      <div className="profile-buttons">
        <button className="darkbutton" onClick={()=>{}}>+ purchase points</button>
        <div className="update-button">
          <button className="lightbutton" onClick={() => {setOpen(true)}}>update profile</button>
          <MyPopup open={open}>
            <form className="update-form">
              <img className="profile-picture" src={tempImage} alt="profile" />
              <label htmlFor="avatar" className="lightbutton rounded upload-file">Upload image</label>
              <input type="file" id="avatar" name="avatar" accept="image/png, image/jpg" onChange={(e) => setTempImage(URL.createObjectURL(e.target.files![0]))} />
              
              <div className="form-input" >
                <label htmlFor="username">username</label><br/>
                <input type="text" id="username" placeholder="username" />
              </div>
              <div className="form-input">
                <label htmlFor="fname">first name</label><br/>
                <input type="text" id="fname" placeholder="first name" />
              </div>
              <div className="form-input">
                <label htmlFor="lname">last name</label><br/>
                <input type="text" id="lname" placeholder="last name" />
              </div>
              {/*button should save info of form on current user*/}
              <div className="update-form-buttons">
                <input className="darkbutton rounded" type="submit" value="Submit" onSubmit={handleSubmit} />
                <button className="lightbutton" onClick={() => {setTempImage(user?.image);setOpen(false);}}>cancel</button>
              </div>
            </form>
          </MyPopup>
        </div>
      </div>
    </div>
  );
}

export default Profile;