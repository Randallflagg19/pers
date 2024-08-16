import React, { useContext, useMemo } from "react";
import Exit from "./Exit/Exit";
import PostItem from "./PostItem/PostItem";
import LinkAuth from "./LinkAuth/LinkAuth";
import Inputs from "./Inputs/Inputs";
import MatchButton from "./MatchButton/MatchButton";
import ArrangeButton from "./ArrangeButton/ArrangeButton";
import { AuthMessageContext, UserContext } from "../App";
import { usePosts } from "./usePosts";
import styles from "./Main.module.css";

export default function Main() {
  // const { setAuthMessage } = useContext(AuthMessageContext);
  const { isLoggedIn, setIsLoggedIn, isGuest, setIsGuest } =
    useContext(UserContext);

  const { posts, handleDeletePost, handleSearchChange, addNewPost, arrange } =
    usePosts(setIsLoggedIn);

  const postsList = useMemo(() => {
    return posts.map((post) => (
      <PostItem post={post} key={post.id} onDelete={handleDeletePost} />
    ));
  }, [posts]);

  if (!isLoggedIn && !isGuest) {
    return <LinkAuth />;
  }

  return (
    <div>
      <div className={styles.mainHeader}>
        <Exit
        //  setAuthMessage={setAuthMessage}
        />
        <MatchButton posts={posts} />
        <ArrangeButton arrange={arrange} />
        <form className={styles.search}>
          Search:
          <input onChange={handleSearchChange} type="search" />
        </form>
      </div>
      <Inputs onAdd={addNewPost} />
      {postsList}
    </div>
  );
}
