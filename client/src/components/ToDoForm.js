import React, { Component } from "react";

class ToDoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addToDo(this.state.inputValue);
    this.setState({
      inputValue: ""
    })
  }

  render() {
    return (
      <form 
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button
          // onClick={this.handleSubmit}
        >
          Add ToDo
        </button>
      </form>
    )
  }
}

export default ToDoForm;