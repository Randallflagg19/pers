import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import PostItem from "./components/PostItem";
import Login from "./components/Login";
import Inputs from "./components/Inputs";

export const Context = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

function App() {
  //контекст
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //<Context.Provider value={[isLoggedIn, setIsLoggedIn]}></Context.Provider>

  const [isGuest, setIsGuest] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      word: "word 1",
      translation: "слово 1",
    },
  ]);
  const [authMessage, setAuthMessage] = useState("Требуется авторизация");

  useEffect(() => {
    // Пользователь
    const isLocalLogin = localStorage.getItem("TheToken");
    if (isLocalLogin) {
      setIsLoggedIn(true);
    }
    fetchAllWords().then((words) => {
      setPosts(words);
    });
  }, []);

  useEffect(() => {
    // гость
    setIsGuest(localStorage.getItem("isGuest") === "true");
  }, [isGuest]);

  async function fetchAllWords() {
    try {
      const response = await fetch("http://localhost:3001/api/translator/get");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      let arrayOfWords = [];
      for (const word of data) {
        arrayOfWords.unshift({
          id: word.id,
          word: word.en,
          translation: word.ru,
        });
      }
      return arrayOfWords;
    } catch (error) {
      console.error("Failed to fetch words:", error);
      return [];
    }
  }

  async function sendWords(en: string, ru: string) {
    let data = { en, ru };
    const response = await fetch("http://localhost:3001/api/translator/write", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("TheToken") || "",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных на сервер");
    }

    const responseData = await response.json();
    return responseData;
  }

  const addNewPost = async (word: string, translation: string) => {
    const newWordData = await sendWords(word, translation);
    const newPost = {
      id: newWordData.id,
      word,
      translation,
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleExit = () => {
    localStorage.removeItem("TheToken");
    setIsLoggedIn(false);
    setAuthMessage("Требуется авторизация");
    setIsGuest(false);
    localStorage.setItem("isGuest", "false");
  };

  return (
    <Context.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {!isLoggedIn && !isGuest ? (
        <div>
          <h1>{authMessage}</h1>
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setAuthMessage={setAuthMessage}
            setIsGuest={(isGuest) => {
              setIsGuest(isGuest);
              localStorage.setItem("isGuest", isGuest ? "true" : "false");
            }}
          />
        </div>
      ) : (
        <div>
          <div className="exit-wrapper">
            <button className="exit-button" onClick={handleExit}>
              exit
            </button>
          </div>
          <Inputs onAdd={addNewPost} />
          {posts.map((post) => (
            <PostItem post={post} key={post.id} onDelete={handleDeletePost} />
          ))}
        </div>
      )}
    </Context.Provider>
  );
}

export default App;
