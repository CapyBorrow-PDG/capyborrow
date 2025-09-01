import '../styles/Navbar.css'
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {

    const checkUser = async () => {
        if (!isAuthenticated || !user) return;
        console.log(user);
        try {
            const res = await fetch(`http://localhost:8888/users`);
            const data = await res.json();

            const exist = data.some(u => u.email === user.email);

            if (!exist) {
                console.log("New user");
                await fetch(`http://localhost:8888/users`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email: user.email, username: user.name})
                });
            } else {
                console.log("Old user");
            }
        } catch (err) {
            console.error("Error", err);
        }
    };
    checkUser();
  }, [isAuthenticated, user])

  return (
    <div>
      {!isAuthenticated ? (
        <div>
        <button className="headerbutton darkbutton" onClick={() => loginWithRedirect()}>Log in</button>
        <button className="headerbutton lightbutton" onClick={() => alert("can't sign up yet :(")}> Sign up</button>
        </div>
      ) : (
        <div>
          <button className="headerbutton darkbutton" onClick={() => navigate('/profile')}> {user.email} </button>
          <button className="headerbutton lightbutton" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;