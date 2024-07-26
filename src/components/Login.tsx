import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({
  setIsLoggedIn,
  setAuthMessage,
  setIsGuest,
}: {
  setIsLoggedIn: (state: boolean) => any;
  setAuthMessage: (message: string) => void;
  setIsGuest: (state: boolean) => any;
}) {
  const [login, setLogin] = useState("test");
  const [pass, setPass] = useState("test");
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <input
        type="text"
        onChange={(e) => {
          setLogin(e.target.value);
        }}
        value={login}
      />

      <input
        type="text"
        onChange={(e) => {
          setPass(e.target.value);
        }}
        value={pass}
      />
      <button
        className="login-button"
        onClick={(e) => {
          fetch("http://localhost:3001/api/login", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              username: login,
              password: pass,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              localStorage.setItem("TheToken", res.token);

              setAuthMessage("Добро пожаловать");
              setIsLoggedIn(true);

              setTimeout(() => {
                navigate("/main");
              }, 500);
            })

            .catch((error) => {
              setIsLoggedIn(false);
              setAuthMessage("Неправильный логин или пароль");
            });
        }}
      >
        Login
      </button>

      <button
        className="login-button"
        onClick={() => {
          setIsGuest(true);
          navigate("/guest")
          setIsLoggedIn(false);
        }}
      >
        Войти как гость
      </button>
      {/* <Link to={"/main"}>Go To Main</Link> */}
    </div>
  );
}
