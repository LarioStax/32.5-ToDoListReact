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
    this.loadToDos = this.loadToDos.bind(this);
    this.addToDo = this.addToDo.bind(this);
  }

  componentDidMount() {
    this.loadToDos();
  }

  loadToDos() {
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

  addToDo(name) {
    fetch(APIURL, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({name: name})
    })
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(newToDo => {
      this.setState({todos: [...this.state.todos, newToDo]})
    })
  }

  render() {
    let todos = this.state.todos.map((todo) => (
      <ToDoItem
        key={todo._id}
        {...todo}
      />
    ))
    return (
      <div>
        <h1>ToDo List Component</h1>
        <ToDoForm 
          addToDo={this.addToDo}
        />
        <ul>
          {todos}
        </ul>
      </div>

    )
  }
}

export default ToDoList;