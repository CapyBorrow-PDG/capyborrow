import { useEffect, useState } from 'react';
import '../styles/Profile.css';
import MyPopup from '../components/Popup.tsx';
//import userFile from '../tempUserFile.json'; //temporary local json file for tests
import { useAuth0 } from '@auth0/auth0-react';
//import user from '../components/Login.tsx'


const Profile = () => {
  const {user, isAuthenticated} = useAuth0();
  
  type User = {
    id: Int16Array,
    image: string,
    username: string,
    fname: string,
    lname: string,
    points: string
  }


  //set default as current stored user info
  const [currentUser, setCurrentUser] = useState<User>();
  //temporary image to display on profile modification
  const [tempImage, setTempImage] = useState<any>();
  const [open, setOpen] = useState(false);
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
    console.log("form :", form);
    const res = await fetch(`http://localhost:8888/users/${currentUser?.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    }).then(data => data.json());

    const updatedUser = res;
    console.log("updatedUser : ", updatedUser);
    setCurrentUser({
      ...currentUser!,
      username: updatedUser.username,
      fname: updatedUser.firstname,
      lname: updatedUser.lastname
    });
    setOpen(false);
    window.location.reload();
  }

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    console.log("tu rentres la dedans ?");
    
    const fetchUser = async () => {
      try {
        console.log("user", user);
        const res = await fetch(`http://localhost:8888/users`);
        const data = await res.json();
        const dbUser = data.find((u) => u.email === user.email);
        console.log("dbUser", dbUser)
        if (dbUser) {
          setCurrentUser({
            id: dbUser.user_id,
            image: dbUser.profile_picture,
            username: dbUser.username,
            fname: dbUser.firstname,
            lname: dbUser.lastname,
            points: dbUser.points,
          })
          setTempImage(dbUser.profile_picture);
          setForm({
            username: dbUser.username || "",
            fname: dbUser.firstname || "",
            lname: dbUser.lastname || "",
          })
          console.log("currentUser: ", currentUser);
        }
      } catch (err) {
        console.error("Error", err);
      }
    }
    fetchUser();
  }, [user, currentUser, isAuthenticated])

  return(
    <div className="profile">
      <img id="pr" className="profile-picture" src={currentUser?.image} alt="profile" />
      <p className="username">{currentUser?.username}</p>
      <p>{currentUser?.fname} {currentUser?.lname}</p>
      <p>{currentUser?.points} points</p>
      
      <div className="profile-buttons">
        <button className="darkbutton" onClick={()=>{}}>+ purchase points</button>
        <div className="update-button">
          <button className="lightbutton" onClick={() => {setOpen(true)}}>update profile</button>
          <MyPopup open={open}>
            <form className="update-form" onSubmit={handleSubmit}>
              <img className="profile-picture" src={tempImage} alt="profile" />
              <label htmlFor="avatar" className="lightbutton rounded upload-file">Upload image</label>
              <input type="file" id="avatar" name="avatar" accept="image/png, image/jpg" onChange={(e) => setTempImage(URL.createObjectURL(e.target.files![0]))} />
              
              <div className="form-input" >
                <label htmlFor="username">username</label><br/>
                <input type="text" id="username" name="username" value={form.username} placeholder={currentUser?.username} onChange={handleChange}/>
              </div>
              <div className="form-input">
                <label htmlFor="fname">first name</label><br/>
                <input type="text" id="fname" name="fname" value={form.fname} placeholder={currentUser?.fname} onChange={handleChange}/>
              </div>
              <div className="form-input">
                <label htmlFor="lname">last name</label><br/>
                <input type="text" id="lname" name="lname" value={form.lname} placeholder={currentUser?.lname} onChange={handleChange} />
              </div>
              {/*button should save info of form on current user*/}
              <div className="update-form-buttons">
                <input className="darkbutton rounded" type="submit" value="Submit" /*onSubmit={handleSubmit}*/ />
                <button className="lightbutton" onClick={() => {setTempImage(currentUser?.image);setOpen(false);}}>cancel</button>
              </div>
            </form>
          </MyPopup>
        </div>
      </div>
    </div>
  );
}

export default Profile;