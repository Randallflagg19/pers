import React, { useContext } from "react";
import styles from "./PostItem.module.css";
import { UserContext } from "../../App";

const PostItem = ({ post, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Вы действительно хотите удалить это слово?"
    );
    if (confirmDelete) {
      const id = post.id;
      try {
        const response = await fetch(
          `http://91.210.170.148/api/translator/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("TheToken"),
            },
            body: JSON.stringify({ id }),
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при удалении слова с сервера");
        }

        console.log(`Word with id ${id} has been deleted.`);
        onDelete(id);
      } catch (error) {
        console.error(`Error deleting word with id ${id}:`, error);
      }
    }
  };

  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <div className={styles.post}>
        <strong>
          {post.word} - {post.translation}
        </strong>
        {isLoggedIn && (
          <button
            className={styles.imageButton}
            onClick={handleDelete}
          ></button>
        )}
      </div>
    </>
  );
};

export default PostItem;
