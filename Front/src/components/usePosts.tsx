import { useEffect, useState } from "react";

export interface Post {
  id: number;
  word: string;
  translation: string;
}

export function usePosts(setIsLoggedIn: (value: boolean) => void) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (localStorage.getItem("TheToken")) {
      setIsLoggedIn(true);
    }

    const fetchAllWords = async () => {
      try {
        const response = await fetch(
          "http://91.210.170.148/api/translator/get"
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
      } catch (error) {
        console.error("Failed to fetch words:", error);
      }
    };

    fetchAllWords();
  }, [setIsLoggedIn]);

  const handleDeletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const addNewPost = async (word: string, translation: string) => {
    try {
      const newWordData = await sendWords(word, translation);
      const newPost = { id: newWordData.id, word, translation };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Failed to add new word:", error);
    }
  };

  const sendWords = async (en: string, ru: string) => {
    const response = await fetch("http://91.210.170.148/api/translator/write", {
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

  const arrange = () => {
    setPosts((prevPosts) => {
      const sortedPosts = [...prevPosts].sort((a, b) =>
        a.word.localeCompare(b.word)
      );
      return sortedPosts;
    });
  };

  return {
    posts: posts.filter((post) =>
      post.word.toLowerCase().includes(searchValue)
    ),
    handleDeletePost,
    handleSearchChange,
    addNewPost,
    arrange,
    searchValue,
  };
}

// const response = await fetch("http://91.210.170.148/api/translator/get");
