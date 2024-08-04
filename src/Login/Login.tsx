import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { AuthMessageContext } from "../App";
import styles from './Login.module.css'

export default function Login() {
  const { setIsLoggedIn, setIsGuest } = useContext(UserContext);
  const [login, setLogin] = useState("test");
  const [pass, setPass] = useState("test");
  const navigate = useNavigate();
  const { authMessage, setAuthMessage } = useContext(AuthMessageContext);

  const handleGuestLogin = () => {
    localStorage.setItem("isGuest", "true");
    setIsGuest(true);
    setIsLoggedIn(false);
    navigate("/main");
  };

  return (
    <div className={styles.authWrapper}>
      <h1>{authMessage}</h1>
      <input
        type="text"
        onChange={(e) => setLogin(e.target.value)}
        value={login}
      />
      <input
        type="text"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
      />
      <button className={styles.loginButton}
        onClick={() => {
          fetch("http://localhost:3001/api/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ username: login, password: pass }),
          })
            .then((res) => res.json())
            .then((res) => {
              localStorage.setItem("TheToken", res.token);
              setAuthMessage("Добро пожаловать");
              setIsLoggedIn(true);
              setTimeout(() => navigate("/main"), 500);
            })
            .then(() => setAuthMessage("Добро пожаловать"))
            .catch(() => {
              setIsLoggedIn(false);
              setAuthMessage("Неправильный логин или пароль");
            });
        }}
      >
        Login
      </button>
      <button className={styles.loginButton} onClick={handleGuestLogin}>Войти как гость</button>
    </div>
  );
}
