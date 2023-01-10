import { useState, useRef } from "react";
import styles from "./MainContent.module.css";
import Input from "./input/Input";
import Dropdown from "./dropdown/Dropdown";

const MainContent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // ref for output element
  const ref = useRef("");
  // dropdown clicked state
  const [responsesObj, setResponsesObj] = useState("");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
    },
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setResponsesObj("");
    return fetchSynonyms();
  };

  //   async function
  const fetchSynonyms = async () => {
    // current text content split into array
    const indivArr = ref.current.value.split(" ");
    const punctSplit = indivArr
      .map((val) =>
        val.match(/[^a-zA-Z ]+/)
          ? val
              .replace(/[^a-zA-Z ]+/, " " + val.match(/[^a-zA-Z ]+/))
              .split(" ")
          : val
      )
      .flat();
    const removePunct = punctSplit.filter((val) =>
      val.replace(/[^a-zA-Z ]+/, "")
    );
    const urlArr = removePunct.map(
      (val) => `https://wordsapiv1.p.rapidapi.com/words/${val}`
    );
    // responses for each word
    const arrayOfResponses = await Promise.all(
      urlArr.map((url) => fetch(url, options).then((res) => res.json()))
    );

    const responses = arrayOfResponses.map((responses) => {
      const hasSynonyms =
        responses.results === undefined
          ? undefined
          : responses.results.filter((value) => value.synonyms !== undefined);
      const extractedSynonyms =
        hasSynonyms === undefined
          ? undefined
          : hasSynonyms.map((val) => val.synonyms.flat());
      const partOfSpeech =
        extractedSynonyms === undefined
          ? undefined
          : responses.results[0].partOfSpeech;
      const obj = {
        word: responses.word,
        synonyms: extractedSynonyms,
        partOfSpeech: partOfSpeech,
      };
      setResponsesObj((prev) => [...prev, obj]);
      return responsesObj;
    });
  };
  return (
    <div className={styles["main-content--container"]}>
      <Input reference={ref} onClick={clickHandler} />
      <div className={styles["output-container"]}>
        <div className={styles["output-field"]}>
          {responsesObj.length > 0 &&
            responsesObj.map((val) => (
              <Dropdown
                key={Math.random()}
                responsesObj={responsesObj}
                word={val.word}
                partOfSpeech={val.partOfSpeech}
                synonyms={val.synonyms}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;

// console.log(
//   indivArr
//     .map((val) =>
//       val.includes(",") ? val.replace(",", " ,").split(" ") : val
//     )
//     .flat()
// );
