import React, { Component } from "react";
import Header from "./UI/Header/header";
import classes from "./todoDetail.module.css";

class todoDetail extends Component {
  state = {
    todo: {
      keys: "",
      id: "",
      title: "",
      body: ""
    }
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    const todo = {};
    for (let i of query.entries()) {
      todo[i[0]] = i[1];
    }
    this.setState({ todo: todo });
  }

  goBackHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <Header back={this.goBackHandler} />
        <label className={classes.textHeader}>{this.state.todo.title}</label>
        <div className={classes.bodyText}>{this.state.todo.body}</div>
      </div>
    );
  }
}

export default todoDetail;
