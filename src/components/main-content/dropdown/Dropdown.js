import React from "react";
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const [optionClicked, setOptionClicked] = useState(props.theWord);
  const dropdownHandler = () => {
    if (dropdownClicked === false) {
      setDropdownClicked(true);
    }
  };
  const optionClickHandler = (e) => {
    setOptionClicked(e.target.textContent);
    setDropdownClicked(false);
  };

  const dropdown = (
    <>
      {props.synonyms !== ""
        ? props.synonyms.map((val) => {
            return (
              <div
                key={Math.random()}
                onClick={optionClickHandler}
                className={styles["option"]}
              >
                {val}
              </div>
            );
          })
        : undefined}
    </>
  );

  return props.theWord === "" ? undefined : (
    <div className={styles["dropdown-container"]}>
      <div onClick={dropdownHandler} className={styles["select"]}>
        {optionClicked === "" ? props.theWord : optionClicked}
        <ArrowDownwardIcon
          sx={{
            width: "2vh",
            height: "3vh",
            marginLeft: "2px",
            borderLeft: "solid rgb(197, 193, 192) 1px",
          }}
        />
      </div>
      {dropdownClicked === true && dropdown}
    </div>
  );
};

export default Dropdown;
