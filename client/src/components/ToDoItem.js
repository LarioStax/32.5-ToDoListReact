import React, { Component } from "react";

class ToDoItem extends Component {
  render() {
    let { name, completed, onDelete } = this.props;
    return (
      <li
        style={{ textDecoration: completed ? "line-through" : "none" }}
      >
        {name}
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