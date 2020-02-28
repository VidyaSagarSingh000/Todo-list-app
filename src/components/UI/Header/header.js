import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./header.module.css";

const header = props => {
  return (
    <div>
      <div className={classes.header}>
        <span className={classes.backArrow} onClick={props.back}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </span>
        <span className={classes.headerText}>Todo App</span>
      </div>
    </div>
  );
};

export default withRouter(header);
