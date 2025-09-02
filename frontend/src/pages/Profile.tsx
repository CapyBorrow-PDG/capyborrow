import { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useAuth0 } from '@auth0/auth0-react';
import Tabs from '../components/Tabs.tsx';
import Article from '../components/Article.tsx';
import AddItemPopup from '../components/AddItemPopup.tsx';
import UpdateProfilePopup from '../components/UpdateProfilePopup.tsx';


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
  const [open, setOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);

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
          <UpdateProfilePopup open={open} close={() => setOpen(false)}
          user={currentUser} setUser={setCurrentUser} blank={blankProfile} />
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