import React, { Component } from "react";
import Main from "./containers/Main";
import TodoDetail from "./components/todoDetail";
import { Route, Redirect, Switch } from "react-router-dom";
import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/todoDetail" component={TodoDetail} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
