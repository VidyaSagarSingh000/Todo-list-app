import React from "react";
import classes from "./todoItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const todoItem = props => {
  return (
    <div
      className={classes.todoItem}
      key={props.keyval}
    >
      <span className={classes.todItemText}>
        {props.keyval + 1}.{props.val.title}
      </span>

      <span onClick={props.delete} className={classes.deleteButton}>
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </span>
    </div>
  );
};

export default todoItem;
