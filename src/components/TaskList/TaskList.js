import React from "react";

import Task from "../Task/Task";

import "./TaskList.css";

export default class TaskList extends React.Component {
  static defaultProps = {
    tasks: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tasks, onDeleted, onToggleCheck, onToggleEdit, editTask, onPaused, offPaused, tick } = this.props;

    const elements = tasks.map((element) => {
      const { id } = element;

      return (
        <Task
          key={id}
          {...element}
          onDeleted={() => onDeleted(id)}
          onToggleCheck={() => onToggleCheck(id)}
          onToggleEdit={() => onToggleEdit(id)}
          onPaused={() => onPaused(id)}
          offPaused={() => offPaused(id)}
          tick={() => tick(id)}
          editTask={editTask}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
