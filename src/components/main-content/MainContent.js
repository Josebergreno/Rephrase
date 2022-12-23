import { useState, useRef } from "react";
import styles from "./MainContent.module.css";
import { Select, MenuItem, SvgIcon } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const MainContent = () => {
  // ref for output element
  const ref = useRef("");
  // state handler for output container
  const [textContent, setTextContent] = useState("");
  // dropdown clicked state
  const [dropdownClicked, setDropdownClicked] = useState(false);
  //   dropdown handler
  const dropdownHandler = () => {
    dropdownClicked === false
      ? setDropdownClicked(true)
      : setDropdownClicked(false);
  };

  //   rephrase handler
  const clickHandler = (e) => {
    e.preventDefault();
    setTextContent(ref.current.value);
    return fetchSynonyms();
  };

  //   async function
  const fetchSynonyms = async () => {
    // current text content broken into array
    const indivArr = ref.current.value.split(" ");
    console.log(indivArr);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b123967923msh19bc23c13dee912p17e95bjsn19b6a6d19eb1",
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    };
    // array of urls based off of indivArr
    const urlArr = indivArr.map(
      (val) => `https://wordsapiv1.p.rapidapi.com/words/${val}/synonyms`
    );
    // calls api for each member of array
    const arrayOfResponses = await Promise.all(
      urlArr.map((url) => fetch(url, options).then((res) => res.json()))
    );
    console.log(arrayOfResponses);
    return arrayOfResponses;
  };
  // map a dropdown for each element of an array
  //   implement ability to filter based off of typed of word
  //   extract dropdown into individual component, and map it below to create multiple dropdowns based off of selected filters (verb, noun, adjective)
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
              ref={ref}
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
        <div className={styles["output-field"]}>
          {/* {textContent} */}

          <div className={styles["dropdown-container"]}>
            <div onClick={dropdownHandler} className={styles["select"]}>
              dropdown
              <ArrowDownwardIcon
                sx={{
                  width: "2vh",
                  height: "3vh",
                  marginLeft: "2px",
                  borderLeft: "solid rgb(197, 193, 192) 1px",
                }}
              />
            </div>
            {dropdownClicked === true && (
              <>
                <div className={styles["option"]}>hello</div>
                <div className={styles["option"]}>hello</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
