import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Notfoundpage from "./components/NotFoundPage/Notfoundpage";
import Login from "./components/Login/Login";
import MemoExample from "./components/MemoExample/MemoExample";
import Main from "./components/Main";
import "./App.css";

export const UserContext = React.createContext<
  | {
      isLoggedIn: boolean;
      isGuest: boolean;
      setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
      setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | any
>(null);
export const AuthMessageContext = React.createContext<
  | {
      authMessage: string;
      setAuthMessage: React.Dispatch<React.SetStateAction<string>>;
    }
  | any
>(null);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [authMessage, setAuthMessage] = useState("Требуется авторизация");
  const navigate = useNavigate();

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isGuest, setIsGuest }}
    >
      <AuthMessageContext.Provider
        value={{
          authMessage,
          setAuthMessage,
        }}
      >
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Notfoundpage />} />
          <Route path="/memo" element={<MemoExample />} />
        </Routes>
        <a onClick={() => navigate("/memo")}>memo</a>
      </AuthMessageContext.Provider>
    </UserContext.Provider>
  );
}
export default App;
