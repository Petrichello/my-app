import React from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: PropTypes.func,
  };

  state = {
    label: "",
    min: "",
    sec: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { addTask } = this.props;
    const { label, min, sec } = this.state;
    e.preventDefault();
    if (label !== "" && min !== "" && sec !== "") {
      addTask(label.trim(), min.trim(), sec.trim());
      this.setState({
        label: "",
        min: "",
        sec: "",
      });
    }
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" type="sumbit" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Min"
            onChange={this.onMinChange}
            value={min}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={sec}
          />
          <input className="hidden" type="submit" />
        </form>
      </header>
    );
  }
}
