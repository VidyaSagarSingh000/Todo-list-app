import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import classes from "./Main.module.css";
import TodoItem from "../components/todoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/UI/Spinner/Spinner";
import Header from "../components/UI/Header/header";
import firebase from "../firebase";

export default class Main extends Component {
  state = {
    todos: [],
    todo: {
      id: uuid(),
      title: "",
      body: ""
    },
    searchItem: "",
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    const todosRef = firebase.database().ref("todos");
    todosRef.on("value", snapshot => {
      let todos = snapshot.val();

      let newTodosArray = [];
      for (let property in todos) {
        newTodosArray.push({
          keys: property,
          id: todos[property].id,
          title: todos[property].title,
          body: todos[property].body
        });
      }
      this.setState({ todos: newTodosArray, isLoading: false });
    });

    // axios
    //   .get("/todos.json")
    //   .then(response => {
    //     console.log(response);
    //     const fetchedItems = [];
    //     for (let key in response.data) {
    //       fetchedItems.push({
    //         ...response.data[key]
    //       });
    //     }
    //     this.setState({
    //       todos: fetchedItems,
    //       isLoading: false
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ isLoading: false });
    //   });
  }
  addTodoHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    firebase
      .database()
      .ref("todos")
      .push(this.state.todo)
      .then(response => {
        this.setState({
          todo: {
            id: uuid(),
            title: "",
            body: ""
          },
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    // axios
    //   .post("/todos.json", this.state.todo)
    //   .then(response => {
    //     console.log(response.data);
    //     this.setState({
    //       todo: {
    //         id: "",
    //         title: "",
    //         body: ""
    //       },
    //       isLoading: false
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ isLoading: false });
    //   });

    // let array = this.state.todos;
    // if (this.state.todo) {
    //   array.push(this.state.todo);
    //   this.setState({
    //     todos: array,
    //     todo: {
    //       id: uuid(),
    //       title: "",
    //       body: ""
    //     },
    //     isLoading: false
    //   });
    // }
  };

  deleteHandler = keys => {
    // const todo = this.state.todos.find(todo => todo.keys === keys);
    firebase
      .database()
      .ref(`todos/${keys}`)
      .remove();

    // axios
    //   .delete(`/todos.json/${item.id}`)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({
    //       todos: newArray,
    //       isLoading: false
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ isLoading: false });
    //   });
  };
  searchItemHandler = input => {
    const query = this.state.todos.find(todo => todo.title === input);

    if (!query) {
      const string = "please enter valid title";
      this.setState({ searchItem: string });
      setTimeout(() => {
        this.setState({ searchItem: "" });
      }, 2000);
    } else {
      let queryParams = [];
      for (let i in query) {
        queryParams.push(
          encodeURIComponent(i) + "=" + encodeURIComponent(query[i])
        );
      }
      const queryString = queryParams.join("&");
      console.log(queryString);
      this.props.history.push({
        pathname: "/todoDetail",
        search: queryString
      });
    }
  };
  searchChangeHandler = e => {
    this.setState({ searchItem: e.target.value });
  };

  inputChangeHandler = e => {
    const updatedTodo = {
      ...this.state.todo
    };
    updatedTodo[e.target.name] = e.target.value;

    this.setState({ todo: updatedTodo });
  };

  render() {
    let todoItems = <Spinner />;
    if (!this.state.isLoading)
      todoItems = this.state.todos.map((todo, key) => {
        return (
          <TodoItem
            key={key}
            keyval={key}
            val={todo}
            delete={keys => this.deleteHandler(todo.keys)}
          />
        );
      });

    return (
      <div>
        <Header />
        <label className={classes.textHeader}>Todo Lists</label>
        <div className={classes.searchBar}>
          <input
            className={classes.textInputSearchBar}
            name="searchItem"
            placeholder="Enter Todos id, Title, Body"
            value={this.state.searchItem}
            onChange={this.searchChangeHandler}
          ></input>
          <span
            className={classes.searchBarIcon}
            onClick={() => this.searchItemHandler(this.state.searchItem)}
          >
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </span>
        </div>
        <div className={classes.content}>
          <div className={classes.items}>{todoItems}</div>
          <div>
            <form onSubmit={this.addTodoHandler}>
              <input
                className={classes.formInput}
                type="text"
                name="title"
                placeholder="Title"
                value={this.state.todo.title}
                onChange={this.inputChangeHandler}
              />
              <input
                className={classes.formInput}
                type="text"
                name="body"
                placeholder="Body"
                value={this.state.todo.body}
                onChange={this.inputChangeHandler}
              />
              <button className={classes.button}>
                <span className={classes.plus}>+</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
