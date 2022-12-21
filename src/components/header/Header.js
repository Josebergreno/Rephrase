import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles["header-container"]}>
      <h1 className={styles["header"]}>Rephrase.com</h1>
    </div>
  );
};

export default Header;
