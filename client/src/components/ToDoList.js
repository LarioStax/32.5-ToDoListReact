import React, { Component } from "react";
import ToDoItem from "./ToDoItem.js";
import ToDoForm from "./ToDoForm.js";

const APIURL = "/api/todos/"

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
      body: JSON.stringify({ name: name })
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(newToDo => {
        this.setState({ todos: [...this.state.todos, newToDo] })
      })
  }

  deleteToDo(id) {
    const deleteURL = APIURL + id;

    fetch(deleteURL, {
      method: "DELETE"
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(() => {
        // const todos = this.state.todos.filter(todo => todo._id !== id)
        // this.setState({todos: todos})
        this.loadToDos(); //this takes longer, but is 100% in sync with the database
      })
  }

  toggleToDo(id, completed) {
    const updateURL = APIURL + id;

    fetch(updateURL, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ completed: !completed })
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((updatedToDo) => {
        // const todos = this.state.todos.map(todo => (
        //   todo._id === updatedToDo._id) ? { ...todo, completed: !todo.completed } : todo
        // );
        // this.setState({todos: todos})
        this.loadToDos(); //this takes longer, but is 100% in sync with the database
      })
  }

  render() {
    let todos = this.state.todos.map((todo) => (
      <ToDoItem
        key={todo._id}
        {...todo}
        onDelete={this.deleteToDo.bind(this, todo._id)} //we have to bind it here and not in constructor due to id
        onToggle={this.toggleToDo.bind(this, todo._id, todo.completed)}
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