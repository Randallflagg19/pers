import React from "react";
import styles from "./ArrangeButton.module.css";

interface ArrangeButtonProps {
  arrange: () => void;
}

const ArrangeButton: React.FC<ArrangeButtonProps> = ({ arrange }) => {
  return (
    <button className={styles.arrange} onClick={arrange}>
      аrrange
    </button>
  );
};

export default ArrangeButton;
