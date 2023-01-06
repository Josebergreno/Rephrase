import { useState, useRef, Suspense } from "react";
import styles from "./MainContent.module.css";
import Input from "./input/Input";
import Dropdown from "./dropdown/Dropdown";
import { SettingsPowerRounded } from "@mui/icons-material";

const MainContent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // ref for output element
  const ref = useRef("");
  // state handler for output container
  const [textContent, setTextContent] = useState("");
  // dropdown clicked state
  const [theWord, setTheWord] = useState("");
  const [fetchedSynonyms, setFetchedSynonyms] = useState("");
  const [responsesArray, setResponsesArray] = useState("");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b123967923msh19bc23c13dee912p17e95bjsn19b6a6d19eb1",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setTextContent(ref.current.value);
    return fetchSynonyms();
  };

  //   async function
  const fetchSynonyms = async () => {
    // current text content split into array
    const indivArr = ref.current.value.split(" ");
    const urlArr = indivArr.map(
      (val) => `https://wordsapiv1.p.rapidapi.com/words/${val}`
    );
    const arrayOfResponses = await Promise.all(
      urlArr.map((url) => fetch(url, options).then((res) => res.json()))
    );
    const [targetObj] =
      arrayOfResponses !== undefined && arrayOfResponses[0].results;

    const partOfSpeech = targetObj.partOfSpeech;
    const synonyms = targetObj.synonyms;

    setFetchedSynonyms(synonyms);
    setResponsesArray(arrayOfResponses);
  };

  return (
    <div className={styles["main-content--container"]}>
      <Input reference={ref} onClick={clickHandler} />
      <div className={styles["output-container"]}>
        <div className={styles["output-field"]}>
          {responsesArray.length > 0 &&
            responsesArray.map((val) => (
              <Dropdown
                key={Math.random()}
                theWord={val.word}
                synonyms={fetchedSynonyms}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
