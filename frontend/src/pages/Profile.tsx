import { useEffect, useState } from 'react';
import '../styles/Profile.css';
import MyPopup from '../components/Popup.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import Tabs from '../components/Tabs.tsx';
import Article from '../components/Article.tsx';
import AddItemPopup from '../components/AddItemPopup.tsx';


const Profile = () => {
  const {user, isAuthenticated} = useAuth0();
  const [itemsUser, setItemsUser] = useState([]);
  
  type User = {
    id: Int16Array,
    image: string,
    username: string,
    fname: string,
    lname: string,
    points: string
  }

  type article = {
    item_id: number,
    picture_url: string,
    name: string,
    state: string,
    price: number,
    is_available: boolean
  }

  const blankProfile = '../assets/images/blank-profile-picture.png';

  //set default as current stored user info
  const [currentUser, setCurrentUser] = useState<User>();
  //temporary image to display on profile modification
  const [tempImage, setTempImage] = useState<any>();
  const [open, setOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
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
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser?.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    }).then(data => data.json()).catch(err => console.log(err));

    const updatedUser = res;
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
    
    const fetchUser = async () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
        .then(res => res.json())
        .then(data => {
          const dbUser = data.find((u) => u.email === user.email);
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
          }
        }).catch(err => console.log(err));
    }
    fetchUser();
  }, [user, currentUser, isAuthenticated])

  useEffect(() => {
    const getItemsUser = async () => {
      const params = new URLSearchParams();
      if (currentUser) params.append("user", currentUser.id.toString());

      fetch(`${process.env.REACT_APP_BACKEND_URL}/item?${params.toString()}`)
      .then(data => data.json())
      .then(res => setItemsUser(res))
      .catch(err => console.log(err));
    }
    getItemsUser();
  }, [currentUser]);

  return(
    <div className="profile">
      <img id="pr" className="profile-picture" src={currentUser?.image || blankProfile} alt="profile" />
      <p className="username">{currentUser?.username}</p>
      <p>{currentUser?.fname} {currentUser?.lname}</p>
      <p>{currentUser?.points} points</p>
      
      <div className="profile-buttons">
        <button className="darkbutton" onClick={()=>{}}>+ purchase points</button>
        <div className="update-button">
          <button className="lightbutton" onClick={() => {setOpen(true)}}>update profile</button>
          {/*create separate component ?*/}
          <MyPopup open={open}>
            <form className="update-form" onSubmit={handleSubmit}>
              <img className="profile-picture" src={tempImage || blankProfile} alt="profile" />
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
              <div className="update-form-buttons">
                <input className="darkbutton rounded" type="submit" value="Submit" />
                <button className="lightbutton" onClick={() => {setTempImage(currentUser?.image);setOpen(false);}}>cancel</button>
              </div>
            </form>
          </MyPopup>

        </div>
      </div>

      <Tabs tabs={[
        {header: <p>My posts</p>,
          content: <div>
            <button className="darkbutton" onClick={() => {setItemOpen(true)}}>+ add item</button>
            <AddItemPopup open={itemOpen} close={() => setItemOpen(false)} userId={currentUser?.id} />
            <div className="articles">
            {
              itemsUser?.map((item: article) => (
              <Article 
                key={item.item_id}
                image={item.picture_url} 
                title={item.name} 
                location={"Martigny, VS"}
                state={item.state}
                price={item.price}
                av={item.is_available}>
                </Article>
            ))
            }
          </div>
        </div>
        },
        {header: <p>Borrowing history</p>,
          content: <p>that is tab 2</p>
        },
        {header: <p>Collections</p>,
          content: <p>here is tab 3</p>
        },
        {header: <p>Messages</p>,
          content: <p>there is tab 4</p>
        },
      ]} />

    </div>
  );
}

export default Profile;