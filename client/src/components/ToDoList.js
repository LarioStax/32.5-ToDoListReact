import React, { Component } from "react";

import ToDoItem from "./ToDoItem.js";
import ToDoForm from "./ToDoForm.js";

import * as apiCalls from "../helpers/apicalls.js";

import "./ToDoList.css"

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

  async loadToDos() {
    const todos = await apiCalls.getToDos()
    this.setState({ todos })
  }

  async addToDo(name) {
    const newToDo = await apiCalls.createToDo(name)
    this.setState({ todos: [...this.state.todos, newToDo] })
  }

  async deleteToDo(id) {
    await apiCalls.deleteToDo(id);
    // const todos = this.state.todos.filter(todo => todo._id !== id)
    // this.setState({todos: todos})
    this.loadToDos(); //this takes longer, but is 100% in sync with the database
  }

  async toggleToDo(id, completed) {
    await apiCalls.updateToDo(id, completed);
    // const todos = this.state.todos.map(todo => (
    //   todo._id === updatedToDo._id) ? { ...todo, completed: !todo.completed } : todo
    // );
    // this.setState({todos: todos})
    this.loadToDos(); //this takes longer, but is 100% in sync with the database
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
      <header>
        <h1>To-Do List</h1>
        <h2>Simple app to declutter your mind!</h2>
      </header>
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