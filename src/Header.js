import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://ecospott-backend.onrender.com/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('https://ecospott-backend.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Eco<span>Spott</span></Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="nav-icon">Post +</Link>
            <a onClick={logout} className="nav-icon">Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="nav-icon">Login</Link>
            <Link to="/register" className="nav-icon">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
