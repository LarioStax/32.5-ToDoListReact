import React, { Component } from "react";

class ToDoItem extends Component {
  render() {
    let { name, completed } = this.props;
    return (
      <li
        style={{ textDecoration: completed ? "line-through" : "none" }}
      >
        {name}
      </li>
    )
  }
}

export default ToDoItem;