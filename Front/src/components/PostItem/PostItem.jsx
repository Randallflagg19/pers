import React, { useContext } from "react";
import styles from "./PostItem.module.css";
import { UserContext } from "../../App";
import api from "../../api/API";
const PostItem = ({ post, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Вы действительно хотите удалить это слово?"
    );
    if (confirmDelete) {
      const id = post.id;
      try {
        await api.delete(id) 
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
