import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles["input-container"]}>
      <form className={styles["form"]}>
        <div className={styles["label-container"]}>
          <label className={styles["label"]} htmlFor="text">
            Please type what you'd like to be rephrased below
          </label>
        </div>
        <div className={styles["text-area--container"]}>
          <textarea
            ref={props.reference}
            className={styles["text-area"]}
            id="text"
            cols={40}
            rows={20}
            placeholder="type whatever you want, and we'll rephrase it"
          ></textarea>
        </div>
        <div className={styles["button-container"]}>
          <button
            type="submit"
            className={styles["button"]}
            onClick={props.onClick}
          >
            <span className={styles["rephrase-span"]}>rephrase</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
