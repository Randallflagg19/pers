import React, {useCallback, useState, useEffect } from "react";
import "./App.css";
import PostItem from "./components/PostItem";
import Login from "./components/Login";
import Inputs from "./components/Inputs";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Exit from "./components/Exit";


export const UserContext = React.createContext<
  | {
      isLoggedIn: boolean;
      isGuest: boolean;
      setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
      setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | any
>(null);

interface Post {
  id: number;
  word: string;
  translation: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [authMessage, setAuthMessage] = useState("Требуется авторизация");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchWord(e.target.value.toLowerCase());
  };
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const searchWord = useCallback(
    debounce((value: string) => {
      setFilteredPosts(
        posts.filter((post) => post.word.toLowerCase().includes(value))
      );
    }, 500),
    [posts]
  );

  useEffect(() => {
    const isLocalLogin = localStorage.getItem("TheToken");
    if (isLocalLogin) {
      setIsLoggedIn(true);
    }
    setIsGuest(localStorage.getItem("isGuest") === "true");
    const fetchAllWords = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/translator/get"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const arrayOfWords = data.map((word: any) => ({
          id: word.id,
          word: word.en,
          translation: word.ru,
        }));
        setPosts(arrayOfWords);
        setFilteredPosts(arrayOfWords);
      } catch (error) {
        console.error("Failed to fetch words:", error);
      }
    };
    fetchAllWords();
  }, []);

  const sendWords = async (en: string, ru: string) => {
    const response = await fetch("http://localhost:3001/api/translator/write", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("TheToken") || "",
      },
      body: JSON.stringify({ en, ru }),
    });
    if (!response.ok) throw new Error("Ошибка при отправке данных на сервер");
    return await response.json();
  };

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

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, isGuest, setIsGuest }}
      >
        <Routes>
          <Route
            path=""
            element={
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
            }
          />

          <Route
            path="/main"
            element={
              isLoggedIn?<div>
                <div className="exit-wrapper">
                  <Exit setAuthMessage={setAuthMessage} />
                  {isLoggedIn && (
                    <form className="search">
                      search:
                      <input onChange={handleSearchChange} type="search" />
                    </form>
                  )}
                </div>
                <Inputs onAdd={addNewPost} />
                {filteredPosts.map((post) => (
                  <PostItem
                    post={post}
                    key={post.id}
                    onDelete={handleDeletePost}
                  />
                ))}
              </div>
              :
              <Link className="authLink" to={"/"}>Авторизация</Link>
            }
          />
          <Route
            path="/guest"
            element={
              <div>
                <div className="exit-wrapper">
                  <Exit setAuthMessage={setAuthMessage} />
                </div>

                {filteredPosts.map((post) => (
                  <PostItem
                    post={post}
                    key={post.id}
                    onDelete={handleDeletePost}
                  />
                ))}
              </div>
            }
          />
          <Route path="*" element={<h1>страничка не найдена</h1>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;

