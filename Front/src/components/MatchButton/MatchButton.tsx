import React from "react";
import styles from "./MatchButton.module.css";

export default function MatchButton({ posts }: any) {
  interface Post {
    id: number;
    word: string;
    translation: string;
  }
  const match = () => {
    const duplicatedPosts: Post[] = [];
    const seen: { [key: string]: boolean } = {};

    posts.forEach((post: any) => {
      if (seen[post.word]) {
        duplicatedPosts.push(post);
      } else {
        seen[post.word] = true;
      }
    });
    console.log("Match!");
    console.log(duplicatedPosts);
  };
  return (
    <button className={styles.match} onClick={match}>
      match
    </button>
  );
}
