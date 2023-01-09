import React from "react";
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [dropdownClicked, setDropdownClicked] = useState(false);
  const [optionClicked, setOptionClicked] = useState(undefined);
  const dropdownHandler = () => {
    if (dropdownClicked === false) {
      setDropdownClicked(true);
    }
  };
  const optionClickHandler = (e) => {
    setOptionClicked(e.target.textContent);
    setDropdownClicked(false);
  };
  console.log(props.synonyms);
  return (
    <div className={styles["dropdown-container"]}>
      <div
        onClick={dropdownHandler}
        className={
          props.synonyms === undefined
            ? styles["no-synonyms--select"]
            : styles["select"]
        }
      >
        {optionClicked === undefined ? props.word : optionClicked}
        {props.synonyms !== undefined && (
          <ArrowDownwardIcon
            sx={{
              width: "2vh",
              height: "3vh",
              marginLeft: "2px",
              borderLeft: "solid rgb(197, 193, 192) 1px",
            }}
          />
        )}
      </div>
      {dropdownClicked === true && props.synonyms !== undefined
        ? props.synonyms.map((val) => {
            return val.map((value) => {
              return (
                <div
                  key={Math.random()}
                  onClick={optionClickHandler}
                  className={styles["option"]}
                >
                  {value}
                </div>
              );
            });
          })
        : undefined}
    </div>
  );
};

export default Dropdown;
