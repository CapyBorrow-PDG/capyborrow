import { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useAuth0 } from '@auth0/auth0-react';
import Tabs from '../components/Tabs/Tabs.tsx';
import UpdateProfilePopup from '../components/Popups/UpdateProfilePopup.tsx';
import PostsTab from '../components/Tabs/PostsTab.tsx';
import CollectionsTab from '../components/Tabs/CollectionsTab.tsx';
import BorrowsTab from '../components/Tabs/BorrowsTab.tsx';
import Searchbar from '../components/Searchbar.tsx';


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

  const blankProfile = '../assets/images/blank-profile-picture.png';

  //set default as current stored user info
  const [currentUser, setCurrentUser] = useState<User>();
  const [open, setOpen] = useState(false);
  

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
          }
        }).catch(err => console.log(err));
    }
    fetchUser();
  }, [user, currentUser, isAuthenticated])

  return(
    <div>
      <Searchbar onChange={()=>{}} />
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
            content: <PostsTab user={currentUser} />
          },
          {header: <p>Borrowing history</p>,
            content: <BorrowsTab user={currentUser} />
          },
          {header: <p>Collections</p>,
            content: <CollectionsTab user={currentUser} />
          },
          {header: <p>Messages</p>,
            content: <p>there is tab 4</p>
          },
        ]} />

      </div>
    </div>
  );
}

export default Profile;