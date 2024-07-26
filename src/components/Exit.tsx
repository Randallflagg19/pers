import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Exit = ({
  setAuthMessage,
}: {
  setAuthMessage: (message: string) => void;
}) => {
  const navigate = useNavigate();
  const { setIsGuest, setIsLoggedIn } = useContext(UserContext);

  const handleExit = () => {
    localStorage.removeItem("TheToken");
    setIsLoggedIn(false);
    setIsGuest(false);
    setAuthMessage("Требуется авторизация");
    localStorage.setItem("isGuest", "false");
    navigate("/");
  };
  return (
    <button className="exit-button" onClick={handleExit}>
      exit
    </button>
  );
};

export default Exit;
