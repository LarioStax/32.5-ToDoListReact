import React, { Component } from "react";
import ToDoItem from "./ToDoItem.js";
import ToDoForm from "./ToDoForm.js";

const APIURL = "/api/todos"

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
    this.loadTodos = this.loadTodos.bind(this);
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos() {
    fetch(APIURL)
      //fetch doesn't throw error with 4xx and 5xx responses
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(todos => this.setState({ todos }))
      .catch(error => console.log(error));
  }

  render() {
    const todos = this.state.todos.map((todo) => {
      return <ToDoItem
        key={todo._id}
        {...todo}
      />
    })
    return (
      <div>
        <h1>ToDo List Component</h1>
        <ToDoForm />
        <ul>
          {todos}
        </ul>
      </div>

    )
  }
}

export default ToDoList;