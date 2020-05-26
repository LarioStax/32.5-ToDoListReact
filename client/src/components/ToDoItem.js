import React, { Component } from "react";

import "./ToDoItem.css"

class ToDoItem extends Component {
  render() {
    let { name, completed, onDelete, onToggle } = this.props;
    return (
      <li className="task">
        <span
          className= {completed ? "done" : "" }
          onClick={onToggle}
        >
          {name}
        </span>
        <span
          onClick={onDelete}
          className="deleteSpan"
        >
          X
        </span>
      </li>
    )
  }
}

export default ToDoItem;