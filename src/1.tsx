import React, { useContext, useState, useEffect } from "react";
import "./App.css";
import PostItem from "./components/PostItem";
import Login from "./components/Login";
import Inputs from "./components/Inputs";

export const UserContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

export const GuestContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [posts, setPosts] = useState<{ id: number; word: string; translation: string }[]>([]);
  const [authMessage, setAuthMessage] = useState("Требуется авторизация");
  const [filteredPosts, setFilteredPosts] = useState<{ id: number; word: string; translation: string }[]>([]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    const result = posts.filter((post) =>
      post.word.toLowerCase().includes(value)
    );
    setFilteredPosts(result);
  }

  useEffect(() => {
    const isLocalLogin = localStorage.getItem("TheToken");
    if (isLocalLogin) {
      setIsLoggedIn(true);
    }
    fetchAllWords().then((words) => {
      setPosts(words);
      setFilteredPosts(words);
    });
  }, []);

  useEffect(() => {
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
    setPosts((prevPosts) => {
      const updatedPosts = [newPost, ...prevPosts];
      setFilteredPosts(updatedPosts);
      return updatedPosts;
    });
  };

  const handleDeletePost = (id: number) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.filter((post) => post.id !== id);
      setFilteredPosts(updatedPosts);
      return updatedPosts;
    });
  };

  const handleExit = () => {
    localStorage.removeItem("TheToken");
    setIsLoggedIn(false);
    setAuthMessage("Требуется авторизация");
    setIsGuest(false);
    localStorage.setItem("isGuest", "false");
  };

  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <GuestContext.Provider value={[isGuest, setIsGuest]}>
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
              {isLoggedIn && (
                <form className="search">
                  search:
                  <input onChange={onChange} type="search" />
                </form>
              )}
            </div>
            <Inputs onAdd={addNewPost} />
            {filteredPosts.map((post) => (
              <PostItem post={post} key={post.id} onDelete={handleDeletePost} />
            ))}
          </div>
        )}
      </GuestContext.Provider>
    </UserContext.Provider>
  );
}

export default App;