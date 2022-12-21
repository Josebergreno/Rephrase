import styles from "./App.module.css";
import Header from "./components/header/Header";
import MainContent from "./components/main-content/MainContent";
import Bottom from "./components/bottom/Bottom";
function App() {
  return (
    <div className={styles["page-container"]}>
      <Header />
      <MainContent />
      <Bottom />
    </div>
  );
}

export default App;
