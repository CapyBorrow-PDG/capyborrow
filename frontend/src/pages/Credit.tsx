import '../styles/Credit.css';
import CreditButton from "../components/CreditButton.tsx";
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

const Credit = () => {

    const {isAuthenticated, user} = useAuth0();
    const [currentUser, setCurrentUser] = useState<User>();

    type User = {
        id: Int16Array,
        image: string,
        email: string,
        username: string,
        fname: string,
        lname: string,
        points: string
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
                  email: dbUser.email,
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
        <div id="section1">
            <h2>{currentUser?.username}</h2>
            <h3>{currentUser?.points} points</h3>
            <div id="buttonSection">
                <CreditButton user_id={currentUser?.id} current_points={currentUser?.points} point_value={10} money_value={3} />
				<CreditButton user_id={currentUser?.id} current_points={currentUser?.points} point_value={25} money_value={7} />
				<CreditButton user_id={currentUser?.id} current_points={currentUser?.points} point_value={50} money_value={13} />
				<CreditButton user_id={currentUser?.id} current_points={currentUser?.points} point_value={100} money_value={25} />
            </div>
        </div>
    );
};

export default Credit; 