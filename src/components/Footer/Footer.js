import { Component } from "react";
import PropTypes from "prop-types";

import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";

export default class Footer extends Component {
  static defaultProps = {
    tasks: 0,
    clearCompleted: () => {},
  };

  static propTypes = {
    tasks: PropTypes.number,
    clearCompleted: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tasks, filter, onFilterChange, clearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{tasks} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}
