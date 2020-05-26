import React, {Component} from "react";

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
    .then(todos => this.setState({todos}))
    .catch(error => console.log(error));
  }

  render() {
    return(
      <h1>ToDo List Component!</h1>
    )
  }
}

export default ToDoList;