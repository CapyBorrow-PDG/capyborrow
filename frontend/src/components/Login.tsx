import '../styles/Navbar.css'
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';

function Login() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {

    const checkUser = async () => {
        if (!isAuthenticated || !user) return;
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
            const data = await res.json();

            const exist = data.some(u => u.email === user.email);

            if (!exist) {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email: user.email, username: user.name})
                });
            } else {
            }
        } catch (err) {
            console.error("Error", err);
        }
    };
    checkUser();
  }, [isAuthenticated, user])
  
  //ATTENTION! Pour le logout, nous n'avons qu'une seule adresse de redirection dans auth0, et nous avons mis localhost:3000 pour faciliter votre correction
  //l'adresse utilisé avant était celle du site. Nous avons essayé de modifier ceci avec des variables d'environnement pour gérer les deux, sans succès.
  return (
    <div>
      {!isAuthenticated ? (
        <div className="buttons" >
          <button className="headerbutton darkbutton" onClick={() => loginWithRedirect()}>Log in</button>
        </div>
      ) : (
        <div className="buttons" >
          <BiUser className="profile-icon clickable" onClick={() => navigate('/profile')} />
          <button className="headerbutton lightbutton" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
