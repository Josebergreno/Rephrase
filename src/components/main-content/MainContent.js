import styles from "./MainContent.module.css";

const MainContent = () => {
  const clickHandler = (e) => {
    console.log(e.target);
  };
  return (
    <div className={styles["main-content--container"]}>
      <div className={styles["input-container"]}>
        <form className={styles["form"]}>
          <div className={styles["label-container"]}>
            <label className={styles["label"]} htmlFor="text">
              Please type what you'd like to be rephrased below
            </label>
          </div>
          <div className={styles["text-area--container"]}>
            <textarea
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
              onClick={clickHandler}
            >
              <span className={styles["rephrase-span"]}>rephrase</span>
            </button>
          </div>
        </form>
      </div>
      <div className={styles["output-container"]}>
        <div className={styles["output-field"]}>output</div>
      </div>
    </div>
  );
};

export default MainContent;
