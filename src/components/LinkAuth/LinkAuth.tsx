import React from "react";
import { Link } from "react-router-dom";
import styles from './LinkAuth.module.css'

export default function LinkAuth() {
  return (
    <Link className={styles.authLink} to={"/"}>
      Авторизация
    </Link>
  );
}
