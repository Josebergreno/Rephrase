import React from "react";
import styles from "./Bottom.module.css";

const Bottom = () => {
  return (
    <div className={styles["bottom-container"]}>
      <div className={styles["contact"]}>
        <h5>Questions, Comments, Concerns?</h5>
        <span className={styles["span"]}> rephrase-questions@yahoo.com</span>
      </div>
    </div>
  );
};

export default Bottom;
