import React, { Component } from "react";

class ToDoItem extends Component {
  render() {
    let { name, completed, onDelete, onToggle } = this.props;
    return (
      <li>
        <span
          style={{ textDecoration: completed ? "line-through" : "none" }}
          onClick={onToggle}
        >
          {name}
        </span>
        <span
          onClick={onDelete}
        >
          {" "}X
        </span>
      </li>
    )
  }
}

export default ToDoItem;